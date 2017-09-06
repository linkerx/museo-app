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
      'filter[orderby]=meta_value_num',
      'filter[meta_key]=inicio',
      'filter[order]=ASC'
    ];

    var opts = {
      url: 'http://admin.emmanozzi.org',
      type: 'topico',
      queries: queries,
      debug: true
    }

    WpApi.getList(opts)
      .then(function(items) {
        this.setState(function () {
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
              <TopicoItem key={item.id} item={item} defaultImg='http://emmanozzi.org/public/images/noimage.jpg' />
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
