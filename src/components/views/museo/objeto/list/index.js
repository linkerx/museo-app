var React = require('react');
var WpList = require('wp/list');
var WpItem = require('wp/item');
require('./styles.less');

function Objetos(props){
  return (
    <section id='objetos'>
      <WpItem type='page' slug='patrimonio-museologico' />
      <WpList type='objeto' imageSize='medium' imageLink={true} />
    </section>
  )
}

module.exports = Objetos;
