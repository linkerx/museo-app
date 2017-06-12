var React = require('react');
var ItemTitle = require('./item-title');
var ItemImage = require('./item-image');

function ListItem(props) {
  return(
    <article>
      <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} />
      <ItemImage />
    </article>
  )
}

module.exports = ListItem;
