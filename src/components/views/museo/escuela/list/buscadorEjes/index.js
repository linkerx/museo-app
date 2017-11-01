var React = require('react');
require('./styles.less');

function BuscadorEjes(props){
  return (
    <section id='buscador-ejes'>

      <div className='form-group'>
        <label htmlFor='input_nivel'>Nivel:</label>
        <select name='input_nivel'>
          <option>Primaria</option>
          <option>Secundaria</option>
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='input_grado'>Grado:</label>
        <select name='input_grado'>
          <option>1º año EP</option>
          <option>1º año ES</option>
          <option>2º año EP</option>
          <option>2º año ES</option>
          <option>3º año EP</option>
          <option>3º año ES</option>
          <option>4º año EP</option>
          <option>4º año ES</option>
          <option>5º año EP</option>
          <option>5º año ES</option>
          <option>6º año EP</option>
          <option>6º año ES</option>
        </select>
      </div>

    </section>
  )
}

module.exports = BuscadorEjes;
