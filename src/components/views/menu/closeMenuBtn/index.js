var React = require('react');
var FontAwesome = require('react-fontawesome');
require('./styles.less');

function MenuTrigger(props) {
  return (
    <div className='close-menu-btn'>
      <button onClick={props.closeMenu}><FontAwesome name='close' /></button>
    </div>
  )
}

module.exports = MenuTrigger;
