var React = require('react');
var Inicio = require('./inicio');
var Calendario = require('./calendario');
var Info = require('./info');

require('./parallax.less');

function Home(){
  return (
    <section id='parallax'>
      <Inicio />
      <Calendario />
      <Info />
    </section>
  )
}

module.exports = Home;
