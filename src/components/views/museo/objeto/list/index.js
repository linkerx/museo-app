var React = require('react');
var WpList = require('wp/list');
var WpItem = require('wp/item');
require('./styles.less');

function Objetos(props){

  if(props.ready){
    setTimeout(function(){props.ready()}, 1000);
  }

  return (
    <section id='objetos'>
      <WpItem type='page' slug='patrimonio-museologico' />
      <WpList type='objeto' imageSize='medium' imageLink={true} />
    </section>
  )
}

module.exports = Objetos;
