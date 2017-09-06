var React = require('react');
var ItemTitle = require('wp/item-title');
var ItemImage = require('wp/item-image');
var renderHTML = require('react-render-html');
var Link = require('react-router-dom').Link;

function TopicoHechoItem(props) {

  var item_image = '';

  if(props.item._embedded && props.item._embedded['wp:featuredmedia']){
    var item_image = props.item._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
  } else if(props.defaultImg) {
    var item_image = props.defaultImg;
  }

  var show_fecha_inicio = '';
  if(props.item.inicio_dia){
    show_fecha_inicio += props.item.inicio_dia+"/";
  }
  if(props.item.inicio_mes){
    show_fecha_inicio += props.item.inicio_mes+"/";
  }
  if(props.item.inicio_anio){
    show_fecha_inicio += props.item.inicio_anio;
  }

  var show_fecha_fin = '';
  if(props.item.fin_dia){
    show_fecha_fin += props.item.fin_dia+"/";
  }
  if(props.item.fin_mes){
    show_fecha_fin += props.item.fin_mes+"/";
  }
  if(props.item.fin_anio){
    show_fecha_fin += props.item.fin_anio;
  }


  return(
    <article>
      <div className='list-item-image'>
        <Link to={'/'+props.item.type+'/'+props.item.slug} >
          <ItemImage render='back' src={item_image} linkTo={'/'+props.item.type+'/'+props.item.slug} />
        </Link>
      </div>
      <div className='list-item-content'>
        <div className='date'>
          [<span className='inicio'>{show_fecha_inicio}</span>-<span className='fin'>{show_fecha_fin}</span>]
        </div>
        <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} />
        <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
      </div>
    </article>
  )
}

module.exports = TopicoHechoItem;
