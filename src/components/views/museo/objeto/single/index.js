var React = require('react');
var WpApi = require('wp/api');
var WpItemImage = require('wp/item-image');
var Cargando = require('utils/cargando');
var FullscreenImage = require('wp/fullscreenImage');
var renderHTML = require('react-render-html');
var Link = require('react-router-dom').Link;
require('./styles.less');

class Objeto extends React.Component {

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
    if(this.props.ready){
      setTimeout(function(){this.props.ready()}.bind(this), 1000);
    }
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
      type: 'objeto',
      slug: this.props.match.params.slug,
      queries: ['_embed'],
      debug: false
    }

    WpApi.getItem(opts)
      .then(function(item){
          this.setState(function(){
            return {
              item: item[0],
              showFull: this.state.showFull
            }
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
      }
    }

    var hasImageClass = 'no-image';
    if(item_image){
      hasImageClass = 'yes-image';
    }

    var showFullIcon = 'plus';
    var showFullText = 'más';
    if(this.state.showFull){
      showFullIcon = 'minus';
      showFullText = 'menos';
    }

    return (
      <section id='objeto'>
        {!this.state.item
          ?
          <Cargando />
          :
          <article className={hasImageClass}>
            <div className='header'>
            <h1>{renderHTML(this.state.item.title.rendered)}</h1>
              {item_image &&
                <div>
                  <WpItemImage src={item_image} render='back' />
                  <FullscreenImage imageSrc={item_image} modalContainer='museo-modal' desc={renderHTML(this.state.item.excerpt.rendered)} />
                </div>
              }
              <div className='return'>
                <Link to='/objetos' title='Volver a objetos'><i class="fas fa-arrow-left"></i></Link>
              </div>
            </div>

            <div className='post-content'>
              <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>

              <div className='show-full-button'>
                <button onClick={() => { this.showFull() }}><i class={"fas fa-"+showFullIcon}></i> {'(ver '+showFullText+')'} </button>
              </div>

              {this.state.showFull &&
                <div className='content'>{renderHTML(this.state.item.content.rendered)}
                  <div className='show-full-button'>
                    <button onClick={() => { this.showFull() }}><i class={"fas fa-"+showFullIcon}></i> {'(ver '+showFullText+')'} </button>
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

module.exports = Objeto;
