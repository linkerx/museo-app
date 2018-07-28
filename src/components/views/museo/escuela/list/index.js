var React = require('react');
var Cargando = require('utils/cargando');
var WpApi = require('wp/api');
var WpItem = require('wp/item');
var EjeItem = require('./listItem');
var ListStyleButtons = require('./listStyleButtons');
var BuscadorEjes = require('./buscadorEjes');
require('./styles.less');
require('./styles_as_icons.less');
require('./styles_as_list.less');

class Ejes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      listStyle: 'icons'
    }
    this.updateItems = this.updateItems.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        items: null,
        listStyle: this.state.listStyle
      }
    });

    var queries = [
      '_embed',
    ];

    var opts = {
      url: null,
      type: 'eje',
      queries: queries,
      debug: false
    }

    WpApi.getList(opts)
      .then(function(response) {
        var items = response.data;
        this.setState(function () {
          items.sort(function(a,b){
            if(a.inicio < b.inicio) return -1;
            if(a.inicio > b.inicio) return 1;
            return 0;
          });
          setTimeout(function(){this.props.ready()}.bind(this), 1000);
          return {
            items: items,
            listStyle: this.state.listStyle
          }
        });
      }.bind(this));
  }

  changeStyle(newStyle){
    this.setState(function(){
      return {
        items: this.state.items,
        listStyle: newStyle
      }
    });
  }

  render() {
    return (
      <section id="archive-ejes" className={this.state.listStyle}>
        <h1>Escuela</h1>
        <WpItem type='page' slug='intro-escuela' articleClass='intro-escuela'/>
        <BuscadorEjes />
        <ListStyleButtons changeStyle={this.changeStyle} actualStyle={this.state.listStyle} />
        <div className='list'>
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            return (
              <EjeItem key={item.id} item={item} defaultImg='/public/images/noimage.jpg' />
            )
          }.bind(this))
        }
        </div>
      </section>
    )
  }
}

// TODO: propTypes
module.exports = Ejes;
