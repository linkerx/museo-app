var React = require('react');
var Link = require('react-router-dom').Link;

function Accesos () {
  return (
    <ul className='nav'>
      <li><Link to='/periodos'>Periodos</Link></li>
      <li><Link to='/topicos'>Topicos</Link></li>
      <li><Link to='/escuela'>Escuela</Link></li>
    </ul>
  )
}

module.exports = Accesos;
