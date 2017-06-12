var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Header = require('./views/header');
var Home = require('./views/home');
var Periodos = require('./views/museo/periodo/list');
var Periodo = require('./views/museo/periodo/single');
var Topicos = require('./views/museo/topico/list');
var Topico = require('./views/museo/topico/single');
var Ejes = require('./views/museo/escuela/list');
var Eje = require('./views/museo/escuela/single');
var NotFound = require('./utils/notfound');

class App extends React.Component {
  render() {
    return (
      <Router >
        <div className='main'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/periodos' component={Periodos} />
            <Route path='/periodo/(:slug)' component={Periodo}/>
            <Route path='/topicos' component={Topicos} />
            <Route path='/topico/(:slug)' component={Topico} />
            <Route path='/escuela' component={Ejes} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
