var React = require('react');
var WpApi = require('./api');
var ListItem = require('./list-item');

class WpSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      current: null,
      timer: null,
    }
    this.updateItems = this.updateItems.bind(this);
    this.start = this.start.bind(this);
    this.run = this.updateItems.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        items: null
      }
    });
    var opts = {
      url: this.props.url,
      type: this.props.type,
      queries: this.props.queries,
      debug: true
    }

    WpApi.getList(opts)
      .then(function(items) {
        this.setState(function () {
          return {
            items: items,
            current: null,
            timer: setTimeout(function(){this.start()}.bind(this),0)
          }
        }.bind(this));
      }.bind(this));
  }

  start(){
    var initItems = [];
    var current = {
      items: this.state.items,
      current: {
        items: initItems
      },
      timer: setTimeout(function(){this.next()}.bind(this),10000)
    }
  }

  next(){
    var nextItems = [];
    var current = {
      items: this.state.items,
      current: {
        items: nextItems
      },
      timer: setTimeout(function(){this.next()}.bind(this),10000)
    }
  }

  render() {
    return (
      <div className="slider">
        {this.props.list &&
          <div className='list'>
          {!this.state.items
            ?
            this.props.children
            :
            this.state.items.map(function (item, index) {
              return (<ListItem key={item.id} item={item} />)
            })
          }
          </div>
        }

        <div className='page'>
          {!this.state.currentItems
            ?
            this.props.children
            :
            this.state.currentItems.map(function (item, index) {
              return (<ListItem key={item.id} item={item} />)
            })
          }
        </div>
        <div className='navigation'>

        </div>
      </div>
    )
  }
}

module.exports = WpSlider;
