var React = require('react');
var Cargando = require('utils/cargando');
var WpItem = require('wp/item');

function Topico(props) {
  return (
    <section id='single-topico'>
      console.log('topico');
      <WpItem url='http://localhost' type='topico' slug='{this.props.routeParams}'>
        <Cargando />
      </WpItem>
    </section>
  )
}

module.exports = Topico;
