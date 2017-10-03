var React = require('react');
var WpSlider = require('wp/slider');
require('./styles.less');


function Separador() {
  var queries = [
    '_embed',
    'filter[album]=home-separador'
  ];

  var options = {
    pageImgSize: 'full'
  }

  return (
    <section id='home-separador' className='parallax-group'>
      <div className='home-slider-separador'>
        <WpSlider url='http://admin.emmanozzi.org' type='media' queries={queries} render='back' options={options} debug={false} />
      </div>
    </section>
  )
}

module.exports = Separador;
