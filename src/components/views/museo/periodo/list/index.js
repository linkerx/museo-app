var React = require('react');
var Cargando = require('utils/cargando');
var WpApi = require('wp/api');
var PeriodoItem = require('./listItem');
var ListStyleButtons = require('./listStyleButtons');
require('./styles.less');
require('./styles_as_icons.less');
require('./styles_as_list.less');

class Periodos extends React.Component {

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
      type: 'periodo',
      queries: queries,
      debug: false
    }

    WpApi.getList(opts)
      .then(function(items) {
        this.setState(function () {

          items.sort(function(a,b){
            if(a.inicio < b.inicio) return -1;
            if(a.inicio > b.inicio) return 1;
            return 0;
          });

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
      <section id="archive-periodos" className={this.state.listStyle}>
        <h1>Períodos</h1>
        <ListStyleButtons changeStyle={this.changeStyle} actualStyle={this.state.listStyle} />
        <div className='list'>
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            return (
              <PeriodoItem key={item.id} item={item} defaultImg='http://emmanozzi.org/public/images/noimage.jpg' />
            )
          }.bind(this))
        }
        </div>
      </section>
    )
  }
}

// TODO: propTypes

module.exports = Periodos;
