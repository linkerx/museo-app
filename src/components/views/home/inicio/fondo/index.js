var React = require('react');
var Cargando = require('utils/cargando');
var WpMediaList = require('wp/medialist');
require('./styles.less');

function Fondo() {

  var queries = [
    '_embed',
    'filter[album]=fondo-inicio'
  ];

  return (
    <div className='fondo'>
      <WpMediaList url='http://localhost' queries={queries} size='full' render='back' >
        <Cargando />
      </WpMediaList>
    </div>
  )
}

module.exports = Fondo;
