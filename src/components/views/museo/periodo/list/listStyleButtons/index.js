var React = require('react');
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
      <button className={classList} onClick={() => { props.changeStyle('list') }}><i className="fas fa-list"></i></button>
      <button className={classIcons} onClick={() => { props.changeStyle('icons') }}><i className="fas fa-th"></i></button>
    </div>
  )
}

module.exports = ListStyleButtons;
