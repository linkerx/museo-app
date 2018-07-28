var React = require('react');
var WpList = require('wp/list');
var Link = require('react-router-dom').Link;
require('./styles.less');

function Novedades(){

  var DestQueries = [
    '_embed',
    'categories=21',
    'per_page=3'
  ];

  return (
    <section id='home-novedades' className='parallax-group'>
      <h1>Ultimas Novedades</h1>
      <WpList type='posts' queries={DestQueries} debug={false} imageSize='medium' imageRender='back' template='2' />
      <div className='ver-todas'><Link to='/novedades' >Ver todas las novedades</Link></div>
    </section>
  )
}

module.exports = Novedades;
