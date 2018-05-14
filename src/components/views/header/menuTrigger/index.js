var React = require('react');
var NavLink = require('react-router-dom').NavLink;
require('./styles.less');

function MenuTrigger(props) {
  return (
    <div className='menu-trigger'>

      <NavLink exact to='/' activeClassName="active">
        <span>Inicio</span>
        <i class="fas fa-home"></i>
      </NavLink>

      <NavLink to='/novedades' activeClassName="active">
        <span>Novedades</span>
        <i class="far fa-newspaper"></i>
      </NavLink>

      <NavLink to='/contacto' activeClassName="active">
        <span>Contacto</span>
        <i class="fas fa-envelope"></i>
      </NavLink>

      <a className='menu' onClick={props.openMenu} >
        <span>Menu</span>
        <i class="fas fa-bars"></i>
      </a>
    </div>
  )
}

module.exports = MenuTrigger;
