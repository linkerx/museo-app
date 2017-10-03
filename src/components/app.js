var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var historyCreator = require('history');
var Piwik = require('./utils/piwik');

var history = historyCreator.createBrowserHistory();

var Menu = require('./views/menu');
var Header = require('./views/header');
var Footer = require('./views/footer');
var Home = require('./views/home');
var Periodos = require('./views/museo/periodo/list');
var Periodo = require('./views/museo/periodo/single');
var Topicos = require('./views/museo/topico/list');
var Topico = require('./views/museo/topico/single');
var Hecho = require('./views/museo/hecho');
var Ejes = require('./views/museo/escuela/list');
var Eje = require('./views/museo/escuela/single');
var WpSite = require('./views/site');

require('./app.less');

class App extends React.Component {

  constructor(props){
   super(props);
   this.state = {
     menuOpen: false
   }

   this.openMenu = this.openMenu.bind(this);
   this.closeMenu = this.closeMenu.bind(this);
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
          <Route path='/' render={ function(props) { return ( <Menu {...props} open={this.state.menuOpen} closeMenu={this.closeMenu} /> ) }.bind(this) } />
          <Route path='/' render={ function(props) { return ( <Header {...props} openMenu={this.openMenu} /> ) }.bind(this) } />
          <div id='main-wrapper'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/periodos' component={Periodos} />
              <Route exact path='/periodo/:slug' component={Periodo}/>
              <Route exact path='/topicos' component={Topicos} />
              <Route exact path='/topico/:slug' component={Topico} />
              <Route exact path='/proceso/:slug' component={Hecho} />
              <Route exact path='/escuela' component={Ejes} />
              <Route exact path='/escuela/eje/:slug' component={Eje} />
              <Route path='/:slug' render={ function(props) { return ( <WpSite {...props} /> ) }.bind(this) } />
            </Switch>
          </div>
          <Route path='/' render={ function(props) { return ( <Footer {...props} /> ) }.bind(this) } />
        </div>
      </Router>
    )
  }
}

module.exports = App;
