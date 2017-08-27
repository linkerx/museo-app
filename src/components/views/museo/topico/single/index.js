var React = require('react');
var Cargando = require('utils/cargando');
var WpItem = require('wp/item');

function Topico(props) {
  return (
    <section id='single-topico'>
      <WpItem url='http://admin.emmanozzi.org' type='topico' slug='{this.props.routeParams}'>
        <Cargando />
      </WpItem>
    </section>
  )
}

module.exports = Topico;
