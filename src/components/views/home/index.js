var React = require('react');
var Inicio = require('./inicio');
var Calendario = require('./calendario');
var Info = require('./info');

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
