var React = require('react');
var Accesos = require('./accesos');
var Fondo = require('./fondo');

function Inicio() {
  return (
    <section id='home-inicio'>
      <Fondo />
      <Accesos />
    </section>
  )
}

module.exports = Inicio;
