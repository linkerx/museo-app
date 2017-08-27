var React = require('react');
var ItemTitle = require('wp/item-title');
var ItemImage = require('wp/item-image');
var renderHTML = require('react-render-html');

function PeriodoItem(props) {

  var item_image = '';

  if(props.item._embedded && props.item._embedded['wp:featuredmedia']){
    var item_image = props.item._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
  } else if(props.defaultImg) {
    var item_image = props.defaultImg;
  }


  return(
    <article>
      <ItemImage render='back' src={item_image} linkTo={'/'+props.item.type+'/'+props.item.slug} />
      <div className='date'>
        [<span className='inicio'>{props.item.periodo_inicio}</span>-<span className='fin'>{props.item.periodo_fin}</span>]
      </div>
      <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} />
      <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
    </article>
  )
}

module.exports = PeriodoItem;
