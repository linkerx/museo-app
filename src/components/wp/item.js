var React = require('react');
var WpApi = require('./api');

class WpItem extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null
    }

    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount(){
    this.updateItem();
  }

  updateItem(){
    this.setState(function(){
      return {
        item: null
      }
    });
    var opts = {
      url: this.props.url,
      type: this.props.type,
      slug: this.props.slug
    }

    WpApi.getItem(opts)
      .then(function(item){
        this.setState(function(){
          return {
            items: items
          }
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="item">
        {!this.state.item
          ?
          this.props.children
          :
          <ItemTitle linkTo='#' title={this.state.item.title.rendered}/>
          })
        }
      </div>
    )
  }

}

module.exports = WpItem;
