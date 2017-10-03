var React = require('react');
require('./styles.less');

function FooterData(props){
  return (
    <footer>
      <div className='ubicacion'>
        Juan José Biedma 50, Carmen de Patagones, Buenos Aires, Argentina
      </div>
      <div className='horarios'>
        Lunes a viernes de 10 a 12 hs. y de 15 a 17 hs. - sábados de 17 a 19 hs.
      </div>
      <div className='contacto'>
        Tel: 02920-462729 / 464291 museoema@live.com.ar
      </div>
    </footer>
  )
}

module.exports = FooterData;
