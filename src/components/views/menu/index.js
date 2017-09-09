var React = require('react');
var WpMenu = require('wp/menu');
var CloseMenuBtn = require('./closeMenuBtn');
var MuseoInfo = require('./museoInfo');
require('./styles.less');

class Menu extends React.Component {

  constructor(props){
    super(props);

    var menuClass = 'closed';
    if(props.open){
      menuClass = 'opened';
    }

    var menuPos='bar';
    if(props.location.pathname == "/"){
      menuPos='full';
    }

    this.state = {
      menuClass: menuClass,
      menuPos: menuPos
    }


    this.handleScroll = this.handleScroll.bind(this);
    this.listenScroll = this.listenScroll.bind(this);
    this.updatePos = this.updatePos.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    //console.log("updateTo: "+ this.props.location.pathname);
    if(prevProps.location.pathname !== this.props.location.pathname) {
      if(this.props.location.pathname == "/"){
        this.updatePos('full');
        this.listenScroll();
      } else {
        this.updatePos('bar');
      }
    }

    if(prevProps.open != this.props.open){

      var menuClass = 'closed';
      if(this.props.open){
        menuClass = 'opened';
      }

      this.setState({
       menuClass: menuClass
      });
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

    var menuPos='bar';
    if(this.props.location.pathname == "/"){
      if(scrollTop == 0){
        menuPos='tofull';
      } else {
        menuPos='tobar';
      }

      if(menuPos != this.state.style){
        this.setState({
         menuPos: menuPos
        });
      }
    }
  }

  updatePos(forcedState){
    this.setState({
     menuPos: forcedState
    });
  }

  render(){
    return (
      <div id='menu' className={this.state.menuClass+" "+this.state.menuPos} >
        <CloseMenuBtn closeMenu={this.props.closeMenu} />
        <MuseoInfo />
        <WpMenu url='http://admin.emmanozzi.org' location='main-menu-location' debug={true} />
      </div>
    )
  }
}



module.exports = Menu;
