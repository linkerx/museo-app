var React = require('react');
var Link = require('react-router-dom').Link;

function ItemTitle(props) {
  return (
    <div className='title'>
      <Link to={props.linkTo}>{props.title}</Link>
    </div>
  )
}

module.exports = ItemTitle;
