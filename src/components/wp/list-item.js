var React = require('react');
var ItemTitle = require('./item-title');
var ItemImage = require('./item-image');

function ListItem(props) {

  var item_image = '';

  if(props.item._embedded && props.item._embedded['wp:featuredmedia']){
    var item_image = props.item._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
  } else if(props.defaultImg) {
    var item_image = props.defaultImg;
  }

  return(
    <article>
      <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} />
      <ItemImage render='img' src={item_image} />
    </article>
  )
}

module.exports = ListItem;
