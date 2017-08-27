var React = require('react');
var Accesos = require('./accesos');
var Fondo = require('./fondo');
require('./styles.less');


function Inicio() {
  return (
    <section id='home-inicio' className='parallax-group'>
      <div className='parallax-layer parallax-layer-front'>
        <Accesos />
      </div>
    </section>
  )
}

module.exports = Inicio;
