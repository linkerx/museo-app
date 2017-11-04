var React = require('react');
var FontAwesome = require('react-fontawesome');
var Link = require('react-router-dom').Link;
require("./styles.less");

function FooterSocial() {
  return (
    <div className="footer-social">
      <span>Seguinos en:</span>
      <Link to='https://www.facebook.com/Museo-Emma-Nozzi-Banco-Provincia-184320998269935/'><FontAwesome name='facebook' /></Link>
    </div>
  )
}

module.exports = FooterSocial;
