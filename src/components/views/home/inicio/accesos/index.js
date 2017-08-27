var React = require('react');
var Link = require('react-router-dom').Link;
require('./styles.less');
var Image = require('./noimage.jpg');

function Accesos () {
  return (
    <ul className='secciones'>
      <li>
        <img src={Image} />
        <h2><Link to='/periodos'>Periodos</Link></h2>
      </li>
      <li>
        <img src={Image} />
        <h2><Link to='/topicos'>Topicos</Link></h2>
      </li>
      <li>
        <img src={Image} />
        <h2><Link to='/escuela'>Escuela</Link></h2>
      </li>
    </ul>
  )
}

module.exports = Accesos;
