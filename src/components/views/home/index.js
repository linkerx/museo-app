var React = require('react');
var Inicio = require('./inicio');
var Accesos = require('./accesos');
var Calendario = require('./calendario');
var Separador = require('./separador');
var Novedades = require('./novedades');
var Info = require('./info');

require('./parallax.less');

function Home(){
  return (
    <section id='parallax'>
      <Inicio />
      <Accesos />
      <Calendario />
      {/*<Separador />*/}
      <Novedades />
      <Info />
    </section>
  )
}

module.exports = Home;
