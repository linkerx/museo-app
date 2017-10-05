var React = require('react');
var WpSlider = require('wp/slider');
require('./styles.less');


function Inicio() {
  var queries = [
    '_embed',
    'filter[album]=fondo-inicio'
  ];

  var options = {
    pageImgSize: 'full'
  }

  return (
    <section id='home-inicio' className='parallax-group'>
      <div className='parallax-layer parallax-layer-back'>
        <div className='home-slider'>
          {/* <WpSlider url='http://admin.emmanozzi.org' type='media' queries={queries} options={options} debug={false} /> */}
        </div>
      </div>
    </section>
  )
}

module.exports = Inicio;
