var React = require('react');
var Link = require('react-router-dom').Link;

function ItemTitle(props) {
  return (
      <h2><Link to={props.linkTo}>{props.title}</Link></h2>
  )
}

module.exports = ItemTitle;
