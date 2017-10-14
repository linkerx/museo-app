var React = require('react');
var FooterData = require('utils/footerData');
require('./styles.less');

function Footer(props) {
  return (
    <footer>
      {props.location.pathname !== "/" &&
        <FooterData />
      }
    </footer>
  )
}

module.exports = Footer;
