var React = require('react');
var SiteTitle = require('./siteTitle');
var MenuTrigger = require('./menuTrigger');
require("./styles.less");

class Header extends React.Component {

  constructor(props){
      super(props);

      var headerStyle='bar';
      if(props.location.pathname == "/"){
        headerStyle='full';
      }

      this.state = {
        style: headerStyle
      }

      this.handleScroll = this.handleScroll.bind(this);
      this.listenScroll = this.listenScroll.bind(this);
      this.updateBar = this.updateBar.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    //console.log("updateTo: "+ this.props.location.pathname);
    if(prevProps.location.pathname !== this.props.location.pathname) {
      if(this.props.location.pathname == "/"){
        this.updateBar('full');
        this.listenScroll();
      } else {
        this.updateBar('bar');
      }
    }
  }

  componentDidMount() {
    //console.log("mountTo: "+this.props.location.pathname);
    if(this.props.location.pathname == "/"){
      this.listenScroll();
    }
  }

  listenScroll(){
    document.getElementById('parallax').addEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    scrollTop = 0;
    if(event){
      var scrollTop = event.target.scrollTop;
    }

    //console.log(this.props.path);

    var headerStyle='bar';
    if(this.props.location.pathname == "/"){
      if(scrollTop == 0){
        headerStyle='tofull';
      } else {
        headerStyle='tobar';
      }

      if(headerStyle != this.state.style){
        this.setState({
         style: headerStyle
        });
      }
    }
  }

  updateBar(forcedState){

    /*
    // animation
    if(forcedState == 'bar'){
      if(this.state.headerStyle == 'bar' || this.state.headerStyle == 'toBar'){
        forcedState = 'bar';
      } else {
        forcedState = 'toBar';
      }
    } else {
      if(this.state.headerStyle == 'full' || this.state.headerStyle == 'toFull'){
        forcedState = 'full';
      } else {
        forcedState = 'toFull';
      }
    }
    */

    this.setState({
     style: forcedState
    });
  }


  render(){

    return(
      <header className={this.state.style}>
        <SiteTitle />
        <MenuTrigger openMenu={this.props.openMenu} />
      </header>
    );
  }

}

module.exports = Header;
