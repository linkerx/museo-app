var React = require('react');
var FontAwesome = require('react-fontawesome');
require('./styles.less');

function ListStyleButtons(props){

  var classList = 'lista ';
  if(props.actualStyle == 'list'){
    classList += 'active';
  }

  var classIcons = 'iconos ';
  if(props.actualStyle == 'icons'){
    classIcons += 'active';
  }

  return(
    <div id='list-style-buttons'>
      <button className={classList} onClick={() => { props.changeStyle('list') }}><FontAwesome name='list' /></button>
      <button className={classIcons} onClick={() => { props.changeStyle('icons') }}><FontAwesome name='th' /></button>
    </div>
  )
}

module.exports = ListStyleButtons;
