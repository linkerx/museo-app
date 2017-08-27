var React = require('react');
var Cargando = require('utils/cargando');
var WpList = require('wp/list');
require('./styles.less');

function Topicos() {

  var type = 'topico';
  var queries = ['_embed'];

  return (
    <section id="archive-topicos">
      <WpList url='http://admin.emmanozzi.org' type={type} queries={queries} defaultImg={true} >
        <Cargando />
      </WpList>
    </section>
  )
}

module.exports = Topicos;
