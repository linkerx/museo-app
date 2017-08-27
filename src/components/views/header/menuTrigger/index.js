var React = require('react');
var FontAwesome = require('react-fontawesome');
require('./styles.less');

function MenuTrigger(props) {
  return (
    <div className='menu-trigger'>
      <button onClick={props.openMenu}><FontAwesome name='bars' /></button>
    </div>
  )
}

module.exports = MenuTrigger;
