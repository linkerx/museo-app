var React = require('react');
var Cargando = require('utils/cargando');
var WpList = require('wp/list');

function Topicos() {

  var type = 'topico';
  var queries = ['_embed'];

  return (
    <section id="archive-topicos">
      <WpList url='http://localhost' type={type} queries={queries} >
        <Cargando />
      </WpList>
    </section>
  )
}

module.exports = Topicos;
