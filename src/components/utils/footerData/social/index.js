var React = require('react');
var FontAwesome = require('react-fontawesome');
require("./styles.less");

function FooterSocial() {
  return (
    <div className="footer-social">
      <span>Seguinos en:</span>
      <FontAwesome name='facebook' />
    </div>
  )
}

module.exports = FooterSocial;
