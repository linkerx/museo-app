var React = require('react');
var WpApi = require('wp/api');
var WpItemImage = require('wp/item-image');
var Cargando = require('utils/cargando');
var FontAwesome = require('react-fontawesome');
var renderHTML = require('react-render-html');
var EjeHechoItem = require('./hechoItem');
require('./styles.less');
require('./hechos.less');


class Eje extends React.Component {

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
      url: 'http://admin.emmanozzi.org',
      type: 'eje',
      slug: this.props.match.params.slug,
      queries: ['_embed'],
      debug: false
    }

    WpApi.getItem(opts)
      .then(function(item){

          var queries_hechos = [
            '_embed',
            'filter[eje]='+item[0].id,
            'filter[orderby]=meta_value_num',
            'filter[meta_key]=inicio',
            'filter[order]=ASC'
          ];

          var opts_hechos = {
            url: 'http://admin.emmanozzi.org',
            type: 'proceso',
            queries: queries_hechos,
            debug: false
          }

          WpApi.getList(opts_hechos)
            .then(function(hechos) {
              item[0].hechos = hechos;
              this.setState(function(){
                return {
                  item: item[0],
                  showFull: this.state.showFull
                }
              });
            }.bind(this));
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

    if(this.state.item){
      if(this.state.item._embedded['wp:featuredmedia']){
        var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes['full'].source_url;
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
      <section id='eje'>
        {!this.state.item
          ?
          <Cargando />
          :
          <article className={hasImageClass}>
            <div className='header'>
              {item_image && <WpItemImage src={item_image} render='back'/>}
              <h1>{this.state.item.title.rendered}</h1>
              <div className='date'>
                [<span className='inicio'>{show_fecha_inicio}</span>-<span className='fin'>{show_fecha_fin}</span>]
              </div>
            </div>

            <div className='post-content'>
              <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>

              <div className='show-full-button'>
                <button onClick={() => { this.showFull() }}><FontAwesome name={showFullIcon} /> {'(ver '+showFullText+')'} </button>
              </div>

              {this.state.showFull &&
                <div className='content'>{renderHTML(this.state.item.content.rendered)}</div>
              }

              <div className='hechos'>
                <h1>Hechos/procesos del Eje</h1>
                {this.state.item.hechos &&
                  <div className='list'>
                    {this.state.item.hechos.map(function (item, index) {
                        return (
                          <EjeHechoItem key={item.id} item={item} defaultImg='http://emmanozzi.org/public/images/noimage.jpg' />
                        )
                      }.bind(this))
                    }
                  </div>
                }
              </div>

              <div className='objetos'>
                <h1>Objetos relacionados con el Eje</h1>
              </div>
            </div>
          </article>
        }
      </section>
    )
  }

}

module.exports = Eje;
