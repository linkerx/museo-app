var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Home = require('./views/home');
var Periodos = require('./views/museo/periodo/list');
var Periodo = require('./views/museo/periodo/single');
var Topicos = require('./views/museo/topico/list');
var Topico = require('./views/museo/topico/single');
var Hecho = require('./views/museo/hecho');
var Ejes = require('./views/museo/escuela/list');
var Eje = require('./views/museo/escuela/single');
var WpSite = require('wp/site');


class Main extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      loading: false
    }

    this.ready = this.ready.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.location.pathname,this.props.location.pathname);
    if(nextProps.location.pathname != this.props.location.pathname){
      if(!this.state.loading){
        console.log("loading");
        this.setState(function(){
          return {
            loading: true
          }
        })
      }
    }
  }

  ready(){
    if(this.state.loading){
      console.log("ready");
      this.setState(function(){
        return {
          loading: false
        }
      })
    }
  }

  render(){
    var mainClass='ready';
    if(this.state.loading){
      mainClass='loading';
    }
    return (
      <div id='main-wrapper' className={mainClass}>
        <Switch>
          <Route exact path='/' render={ function(props) { return ( <Home {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/periodos' render={ function(props) { return ( <Periodos {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/periodo/:slug' render={ function(props) { return ( <Periodo {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/topicos' render={ function(props) { return ( <Topicos {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/topico/:slug' render={ function(props) { return ( <Topico {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/escuela' render={ function(props) { return ( <Ejes {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/escuela/eje/:slug' render={ function(props) { return ( <Eje {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/objetos' render={ function(props) { return ( <Objetos {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route exact path='/objeto/:slug' render={ function(props) { return ( <Objeto {...props} ready={this.ready} /> ) }.bind(this) } />
          <Route path='/:slug1/:slug2?/:slug3?' render={ function(props) { return ( <WpSite {...props} ready={this.ready} /> ) }.bind(this) } />
        </Switch>
      </div>
    )
  }
}

module.exports = Main;
