var React = require('react');
var Cargando = require('utils/cargando');
var WpApi = require('wp/api');
var TopicoItem = require('./listItem');
var ListStyleButtons = require('./listStyleButtons');
require('./styles.less');
require('./styles_as_icons.less');
require('./styles_as_list.less');

class Topicos extends React.Component {

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
      type: 'topico',
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
      <section id="archive-topicos" className={this.state.listStyle}>
        <h1>Tópicos</h1>
        <ListStyleButtons changeStyle={this.changeStyle} actualStyle={this.state.listStyle} />
        <div className='list'>
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            return (
              <TopicoItem key={item.id} item={item} defaultImg='public/images/noimage.jpg' />
            )
          }.bind(this))
        }
        </div>
      </section>
    )
  }
}

// TODO: propTypes

module.exports = Topicos;
