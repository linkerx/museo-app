var React = require('react');
var Link = require('react-router-dom').Link;
require("./styles.less");

function FooterSocial() {
  return (
    <div className="footer-social">
      <span>Seguinos en:</span>
      <Link to='https://www.facebook.com/Museo-Emma-Nozzi-Banco-Provincia-184320998269935/'><i className="fab fa-facebook-f"></i></Link>
    </div>
  )
}

module.exports = FooterSocial;
