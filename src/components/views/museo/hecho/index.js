var React = require('react');
var WpApi = require('wp/api');
var WpItemImage = require('wp/item-image');
var Cargando = require('utils/cargando');
var FontAwesome = require('react-fontawesome');
var renderHTML = require('react-render-html');
require('./styles.less');

class Hecho extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null,
      showFull: false
    }

    this.updateItem = this.updateItem.bind(this);
    this.showFull = this.showFull.bind(this);
  }

  componentDidMount(){
    this.updateItem();
  }

  updateItem(){
    this.setState(function(){
      return {
        item: null,
        showFull: this.state.showFull
      }
    });
    var opts = {
      url: null,
      type: 'proceso',
      slug: this.props.match.params.slug,
      queries: ['_embed'],
      debug: true
    }

    WpApi.getItem(opts)
      .then(function(item){
        this.setState(function(){
          console.log(item[0]);
          return {
            item: item[0],
            showFull: this.state.showFull
          }
        });
      }.bind(this));
  }

  showFull(){
    this.setState(function(){
      return {
        item: this.state.item,
        showFull: !this.state.showFull
      }
    });
  }

  render() {

    if(this.state.item && this.state.item._embedded){
      if(this.state.item._embedded['wp:featuredmedia']){
        if(this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes['large']){
          var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes['large'].source_url;
        } else {
          var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes['full'].source_url;
        }
        var item_image_caption = this.state.item._embedded['wp:featuredmedia'][0].caption.rendered;
      }
    }

    var hasImageClass = 'no-image';
    if(item_image){
      hasImageClass = 'yes-image';
    }

    var show_fecha_inicio = '';
    if(this.state.item){
      if(this.state.item.inicio_dia){
        show_fecha_inicio += this.state.item.inicio_dia+"/";
      }
      if(this.state.item.inicio_mes){
        show_fecha_inicio += this.state.item.inicio_mes+"/";
      }
      if(this.state.item.inicio_anio){
        show_fecha_inicio += this.state.item.inicio_anio;
      }

      var show_fecha_fin = '';
      if(this.state.item.fin_dia){
        show_fecha_fin += this.state.item.fin_dia+"/";
      }
      if(this.state.item.fin_mes){
        show_fecha_fin += this.state.item.fin_mes+"/";
      }
      if(this.state.item.fin_anio){
        show_fecha_fin += this.state.item.fin_anio;
      }
    }

    var showFullIcon = 'plus';
    var showFullText = 'más';
    if(this.state.showFull){
      showFullIcon = 'minus';
      showFullText = 'menos';
    }

    return (
      <section id='hecho'>
        {!this.state.item
          ?
          <Cargando />
          :
          <article className={hasImageClass}>
            <div className='header'>
              {item_image &&
                <div>
                  <WpItemImage src={item_image} render='back'/>
                  <FullscreenImage imageSrc={item_image} modalContainer='museo-modal' desc={item_image_caption} />
                </div>
              }
              <h1>{renderHTML(this.state.item.title.rendered)}</h1>
              <div className='date'>
                [<span className='inicio'>{show_fecha_inicio}</span>-<span className='fin'>{show_fecha_fin}</span>]
              </div>
            </div>

            <div className='hecho-data'>
              {this.state.item.periodo && this.state.item.periodo.lenght > 0 &&
                <div className = 'periodo'>
                  <strong>Periodo: </strong>{this.state.item.periodo[0].title}
                </div>
              }

              {this.state.item.alcance &&
                <div className = 'alcance'>
                  <strong>Alcance: </strong>{this.state.item.alcance}
                </div>
              }

              {this.state.item.topicos &&
                <div className = 'topicos'>
                  <strong>Tópicos: </strong>{this.state.item.alcance}
                </div>
              }

            </div>

            <div className='post-content'>
              <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>

              <div className='show-full-button'>
                <button onClick={() => { this.showFull() }}><FontAwesome name={showFullIcon} /> {'(ver '+showFullText+')'} </button>
              </div>

              {this.state.showFull &&
                <div className='content'>{renderHTML(this.state.item.content.rendered)}</div>
              }

              <div className='objetos'>
                <h1>Objetos relacionados con el Hecho</h1>
              </div>
            </div>
          </article>
        }
      </section>
    )
  }

}

module.exports = Hecho;
