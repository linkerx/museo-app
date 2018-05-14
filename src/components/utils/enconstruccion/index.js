var React = require('react');
var WpItemImage = require('wp/item-image');

function EnConstruccion(){
    return (
        <div className='enconstruccion'>
            <WpItemImage src='/public/assets/images/enconstruccion.png' render='back'/>
            <span>ESPACIO EN CONSTRUCCIÓN</span>
        </div>
    )
}

module.exports = EnConstruccion;
