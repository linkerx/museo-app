var React = require('react');
var WpApi = require('./api');
var ListImage = require('./list-item');

class WpMediaList extends React.Component {

  constructor(props) {
    super();
    this.state = {
      items: null,
    }
    this.updateItems = this.updateItems.bind(this);
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
      type: 'media',
      queries: this.props.queries
    }

    WpApi.getList(opts)
      .then(function(items) {
        this.setState(function () {
          return {
            items: items
          }
        });
      }.bind(this));
  }

  render() {
    return (
      <ul className="list">
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            var size = 'full';
            if(this.props.size){
              size = this.props.size;
            }
            var img_src = item.media_details.sizes[size].source_url;
            return (<li><ItemImage src={img_src} title={item.title.rendered} alt={item.alt_text} /></li>)
          }).bind(this)
        }
      </ul>
    )
  }
}

// TODO: propTypes

module.exports = WpMediaList;
