var React = require('react');
var FooterTitle = require('./title');
var FooterContact = require('./contact');
var FooterSocial = require('./social');
var FooterMenu = require('./menu');
require('./styles.less');

function FooterData(props){
  return (
    <div className='footer-data'>
        <FooterTitle />
        <FooterSocial />
        <FooterContact />
        <FooterMenu />
    </div>
  )
}

module.exports = FooterData;
