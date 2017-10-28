var React = require('react');
var Link = require('react-router-dom').Link;
require('./styles.less');
var WpItemImage = require('wp/item-image');

function Accesos () {
  return (
    <section id='home-accesos' className='parallax-group'>
    <h1>Explorá nuestra historia</h1>
    <ul className='secciones'>
      <li>
        <Link to='/periodos'>
          <WpItemImage src='/public/assets/images/periodos2.jpg' render='back'/>
          <h2>Períodos</h2>
          <span>Los periodos en la historia de Patagones son etapas marcadas por el cambio de circunstancias político económicas.</span>
        </Link>
      </li>
      <li>
        <Link to='/topicos'>
          <WpItemImage src='/public/assets/images/topicos2.jpg' render='back'/>
          <h2>Tópicos</h2>
          <span>En los tópicos encontramos temas puntuales de nuestra historia, temas que despiertan curiosidad e interés general.</span>
        </Link>
      </li>
      <li>
        <Link to='/escuela'>
          <WpItemImage src='/public/assets/images/escuela.jpg' render='back'/>
          <h2>Escuela</h2>
          <span>Este es un lugar destinado para alumnos y docentes, lleno de actividades y propuestas para las escuelas de la región.</span>
        </Link>
      </li>
    </ul>
    </section>
  )
}

module.exports = Accesos;
