var React = require('react');
var Link = require('react-router-dom').Link;
require('./styles.less');
var Image = require('./noimage.jpg');
var WpItemImage = require('wp/item-image');

function Accesos () {
  return (
    <section id='home-accesos' className='parallax-group'>
    <h1>Explorá nuestra historia</h1>
    <ul className='secciones'>
      <li>
        <WpItemImage src={Image} render='back'/>
        <h2><Link to='/periodos'>Periodos</Link></h2>
        <span>Los periodos en la historia de Patagones son etapas marcadas por el cambio de circunstancias político económicas.</span>
      </li>
      <li>
        <WpItemImage src={Image} render='back'/>
        <h2><Link to='/topicos'>Topicos</Link></h2>
        <span>En los tópicos encontramos temas puntuales de nuestra historia, temas que despiertan curiosidad e interés general.</span>
      </li>
      <li>
        <WpItemImage src={Image} render='back'/>
        <h2><Link to='/escuela'>Escuela</Link></h2>
        <span>Este es un lugar destinado para alumnos y docentes, lleno de actividades y propuestas para las escuelas de la región.</span>
      </li>
    </ul>
    </section>
  )
}

module.exports = Accesos;
