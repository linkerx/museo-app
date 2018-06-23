var React = require('react');
require('./styles.less');

function MenuTrigger(props) {
  return (
    <div className='close-menu-btn'>
      <button onClick={props.closeMenu}><i className="far fa-times-circle"></i></button>
    </div>
  )
}

module.exports = MenuTrigger;
