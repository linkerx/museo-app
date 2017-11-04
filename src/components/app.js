var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var historyCreator = require('history');
var Piwik = require('./utils/piwik');

var history = historyCreator.createBrowserHistory();

var Menu = require('./views/menu');
var Header = require('./views/header');
var Main = require('./main');
var Footer = require('./views/footer');

require('./app.less');

class App extends React.Component {
  constructor(props){
   super(props);
   this.state = {
     menuOpen: false,
     loading: true
   }

   this.openMenu = this.openMenu.bind(this);
   this.closeMenu = this.closeMenu.bind(this);
   this.endLoading = this.endLoading.bind(this);
 }

 endLoading(){
   this.setState(function(){
     return {loading: false}
   })
 }

  openMenu(e){
    e.preventDefault();
    this.setState({
      menuOpen: true
    })
  }

  closeMenu(){
    this.setState({
      menuOpen: false
    })
  }

  render() {
    return (
      <Router history={Piwik.connectToHistory(history)}>
        <div className='main'>
          <div className='loading-icon'>
            <img src='/public/assets/images/loading.gif' />
          </div>
          <Route path='/' render={ function(props) { return ( <Menu {...props} show={this.endLoading} open={this.state.menuOpen} closeMenu={this.closeMenu} /> ) }.bind(this) } />
          <Route path='/' render={ function(props) { return ( <Header {...props} show={this.endLoading} menuOpen={this.state.menuOpen} openMenu={this.openMenu} /> ) }.bind(this) } />
          <Route path='/' render={ function(props) { return ( <Main {...props} show={this.endLoading} menuOpen={this.state.menuOpen} openMenu={this.openMenu} /> ) }.bind(this) } />
          <Route path='/' render={ function(props) { return ( <Footer {...props} show={this.endLoading} /> ) }.bind(this) } />
        </div>
      </Router>
    )
  }
}

module.exports = App;
