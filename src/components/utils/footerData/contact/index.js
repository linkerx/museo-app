var React = require('react');
var NavLink = require('react-router-dom').NavLink;
require('./styles.less');

function FooterContact(props){
  return(
    <div className='footer-contact'>
      <div className='ubicacion'>
        José Juan Biedma 64, Carmen de Patagones, Buenos Aires, Argentina
      </div>
      <div className='horarios'>
        Lunes a viernes de 10 a 12:30 y 19 a 21hs. - Sábado de 19 a 21 hs.
      </div>
      <div className='contacto'>
        Tel: 02920-462729 / 464291 museoema@live.com.ar
      </div>
    </div>
  )
}

module.exports = FooterContact;
