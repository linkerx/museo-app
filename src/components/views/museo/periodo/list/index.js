var React = require('react');
var Cargando = require('utils/cargando');
var WpApi = require('wp/api');
var PeriodoItem = require('./listItem');
require('./styles.less');

class Periodos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      listStyle: 'icons'
    }
    this.updateItems = this.updateItems.bind(this);
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

    var queries = ['_embed'];

    var opts = {
      url: 'http://admin.emmanozzi.org',
      type: 'periodo',
      queries: queries,
      debug: false
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

  render() {
    return (
      <section id="archive-periodos" className={this.state.listStyle}>
        <h1>Períodos</h1>
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
