var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var FontAwesome = require('react-fontawesome');
require('./styles.less');

function MenuTrigger(props) {
  return (
    <div className='menu-trigger'>

      <NavLink exact to='/' activeClassName="active">
        <span>Inicio</span>
        <FontAwesome name='home' />
      </NavLink>

      <NavLink to='/novedades' activeClassName="active">
        <span>Novedades</span>
        <FontAwesome name='newspaper-o' />
      </NavLink>

      <NavLink to='/contacto' activeClassName="active">
        <span>Contacto</span>
        <FontAwesome name='envelope-o ' />
      </NavLink>

      <a className='menu' onClick={props.openMenu} >
        <span>Menu</span>
        <FontAwesome name='bars' />
      </a>
    </div>
  )
}

module.exports = MenuTrigger;
