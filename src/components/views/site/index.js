var React = require('react');
var ReactRouter = require('react-router-dom');
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var WpApi = require('wp/api');
var WpSiteArchive = require('./archive');
var WpSitePost = require('./post');
var WpItem = require('wp/item');

class WpSite extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      check: false,
      type: null
    }
    this.checkURL = this.checkURL.bind(this);
  }

  componentDidMount(){
    this.checkURL();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname != this.props.location.pathname) {
      this.checkURL(nextProps.match.params.slug);
    }
  }

  checkURL(){
    this.setState(function(){
      return {
        check: false,
        type: null
      }
    });

    var opts = {
      type: this.props.match.params.slug,
      debug: false
    };

    if (this.props.show && typeof this.props.show === "function") {
      setTimeout(function(){this.props.show()}.bind(this), 2000);
    }

    WpApi.getType(opts)
      .then(function(type){
        if(type){
          this.setState(function(){
            return {
              check: true,
              type: type
            }
          });
        } else {
          this.setState(function(){
            return {
              check: true,
              type: null
            }
          });
        }
      }.bind(this));
  }

  render() {
    console.log(this.state.type);
    return(
      <section id='wp-route'>
      {this.state.check &&
        <div>
        {!this.state.type
        ?
          <section id='site-post' className='page'>
            <WpItem type='page' slug={this.props.match.params.slug} />
          </section>
        :
          <div className='root-content'>
            <Route exact path={this.props.match.url} render={ function(props) { return ( <WpSiteArchive {...props} type={this.state.type} /> ) }.bind(this) } />
            <Route exact path={this.props.match.url+'/:slug'} render={ function(props) { return ( <WpSitePost {...props} type={this.state.type} /> ) }.bind(this) } />
          </div>
        }
        </div>
      }
      </section>
    )
  }
}

module.exports = WpSite;
