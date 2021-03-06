var React = require('react');
var WpApi = require('wp/api');
var WpItemImage = require('wp/item-image');
var Cargando = require('utils/cargando');
var renderHTML = require('react-render-html');
var PeriodoHechoItem = require('./hechoItem');
var FullscreenImage = require('wp/fullscreenImage');
var Link = require('react-router-dom').Link;
require('./styles.less');
require('./hechos.less');
require('./objetos.less');

class Periodo extends React.Component {

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
      type: 'periodo',
      slug: this.props.match.params.slug,
      queries: ['_embed'],
      debug: false
    }

    WpApi.getItem(opts)
      .then(function(item){

          var queries_hechos = [
            '_embed',
            'filter[periodo]='+item[0].id,
          ];

          var opts_hechos = {
            url: null,
            type: 'proceso',
            queries: queries_hechos,
            debug: false
          }

          WpApi.getList(opts_hechos)
            .then(function(response) {
              var hechos = response.data;
              hechos.sort(function(a,b){
                if(a.inicio < b.inicio) return -1;
                if(a.inicio > b.inicio) return 1;
                return 0;
              });

              var hechosAgrupados = hechos.reduce(function(acum,curr){
                //console.log(curr);
                if(curr.alcance == 'local'){
                  if(!acum['locales']) acum['locales'] = [];
                  acum['locales'].push(curr)
                }
                if(curr.alcance == 'nacional'){
                  if(!acum['nacionales']) acum['nacionales'] = [];
                  acum['nacionales'].push(curr)
                }
                if(curr.alcance == 'intenacional'){
                  if(!acum['internacionales']) acum['internacionales'] = [];
                  acum['ineternacionales'].push(curr)
                }
                return acum;
                },
              {});

              item[0].hechos = null; //hechosAgrupados;

              this.setState(function(){
                return {
                  item: item[0],
                  showFull: this.state.showFull
                }
              });
            }.bind(this));

            //console.log(item[0].id);

            var queries_objetos = [
              '_embed',
              'filter[periodo]='+item[0].id,
            ];

            var opts_objetos = {
              url: null,
              type: 'objeto',
              queries: queries_objetos,
              debug: true
            }

            WpApi.getList(opts_objetos)
              .then(function(response) {
                var objetos = response.data;
                if(objetos.length == 0){
                   objetos = null;
                }

                item[0].objetos = objetos;

                if(this.props.ready){
                  setTimeout(function(){this.props.ready()}.bind(this), 1000);
                }

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
      <section id='periodo'>
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
                {show_fecha_inicio != show_fecha_fin
                  ?
                    [<span className='inicio'>{show_fecha_inicio}</span>-<span className='fin'>{show_fecha_fin}</span>]
                  :
                    [<span className='inicio'>{show_fecha_inicio}</span>]
                }
              </div>
              <div className='return'>
                <Link to='/periodos' title='Volver a periodos'><i className="fas fa-arrow-left"></i></Link>
              </div>
            </div>

            <div className='post-content'>
              <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>

              <div className='show-full-button'>
                <button onClick={() => { this.showFull() }}><i className={"fas fa-"+showFullIcon}></i> {'(ver '+showFullText+')'} </button>
              </div>

              {/*this.state.showFull*/ true &&
                <div className='content'>
                  {renderHTML(this.state.item.content.rendered)}
                  <div className='show-full-button'>
                    <button onClick={() => { this.showFull() }}><i class={"fas fa-"+showFullIcon}></i> {'(ver '+showFullText+')'} </button>
                  </div>
                </div>
              }

              { this.state.item.hechos &&
              <div className='hechos'>
                <h1>Hechos/procesos del Período</h1>
                { this.state.item.hechos && this.state.item.hechos.locales &&
                  <div className='list-locales'>
                    <h2>Locales</h2>
                    {this.state.item.hechos.locales.map(function (item, index) {
                        return (
                          <PeriodoHechoItem key={item.id} item={item} defaultImg='public/images/noimage.jpg' />
                        )
                      }.bind(this))
                    }
                  </div>

                }
                { this.state.item.hechos && this.state.item.hechos.nacionales &&
                  <div className='list-nacionales'>
                  <h2>Nacionales</h2>
                    {this.state.item.hechos.nacionales.map(function (item, index) {
                        return (
                          <PeriodoHechoItem key={item.id} item={item} defaultImg='public/images/noimage.jpg' />
                        )
                      }.bind(this))
                    }
                  </div>

                }
                {this.state.item.hechos && this.state.item.hechos.internacionales &&
                  <div className='list-internacionales'>
                  <h2>Internacionles</h2>
                    {this.state.item.hechos.internacionales.map(function (item, index) {
                        return (
                          <PeriodoHechoItem key={item.id} item={item} defaultImg='public/images/noimage.jpg' />
                        )
                      }.bind(this))
                    }
                  </div>

                }

              </div>
              }

                {this.state.item.objetos &&
                  <div className='objetos'>
                  <h1>Objetos relacionados con el Período</h1>

                  <div className='list-objetos'>
                    {this.state.item.objetos.map(function (item, index) {
                        return (
                          <PeriodoHechoItem key={item.id} item={item} defaultImg='public/images/noimage.jpg' />
                        )
                      }.bind(this))
                    }
                  </div>
              </div>
                }
            </div>
          </article>
        }
      </section>
    )
  }

}

module.exports = Periodo;
