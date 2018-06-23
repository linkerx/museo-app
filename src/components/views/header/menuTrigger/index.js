var React = require('react');
var NavLink = require('react-router-dom').NavLink;
require('./styles.less');

function MenuTrigger(props) {
  return (
    <div className='menu-trigger'>

      <NavLink exact to='/' activeClassName="active">
        <span>Inicio</span>
        <i className="fas fa-home"></i>
      </NavLink>

      <NavLink to='/novedades' activeClassName="active">
        <span>Novedades</span>
        <i className="far fa-newspaper"></i>
      </NavLink>

      <NavLink to='/contacto' activeClassName="active">
        <span>Contacto</span>
        <i className="fas fa-envelope"></i>
      </NavLink>

      <a className='menu' onClick={props.openMenu} >
        <span>Menu</span>
        <i className="fas fa-bars"></i>
      </a>
    </div>
  )
}

module.exports = MenuTrigger;
