var React = require('react');
var FooterData = require('utils/footerData');
require('./styles.less');

function Footer(props) {
  return (
    <div className='footer_wrapper'>
      {props.location.pathname !== "/" &&
        <FooterData />
      }
    </div>
  )
}

module.exports = Footer;
