var React = require('react');
var Link = require('react-router-dom').Link;
var EnConstruccion = require('utils/enconstruccion');
require('./styles.less');
var WpItemImage = require('wp/item-image');

function Accesos () {
  return (
    <section id='home-accesos' className='parallax-group'>
    <h1>Explorá nuestra historia</h1>
    <ul className='secciones'>
      <li>
        <Link to='/periodos'>
          <WpItemImage src='/public/assets/images/periodos3.jpg' render='back'/>
          <h2>Períodos</h2>
          <span>Los períodos están signados por procesos políticos, sociales y económicos que implican cambios sustanciales en la vida de los habitantes de la región.</span>
        </Link>
      </li>
      <li>
        <Link to='/topicos'>
          <WpItemImage src='/public/assets/images/topicos3.jpg' render='back'/>
          <h2>Tópicos</h2>
          <span>Los tópicos refieren a temas puntuales de nuestro pasado histórico que interesan a la región.</span>
        </Link>
      </li>
      <li className='escuela'>
        <Link to='/novedades-escuela'>
          <WpItemImage src='/public/assets/images/escuela3.jpg' render='back'/>
          <h2>Escuela</h2>
          <span>Espacio destinado a alumnos y docentes.</span>
        </Link>
      </li>
    </ul>
    </section>
  )
}

module.exports = Accesos;
