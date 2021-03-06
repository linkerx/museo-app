var React = require('react');
var Link = require('react-router-dom').Link;
require("./styles.less");

function FooterTitle() {
  return (
    <div className="site-title">
      <Link to="https://www.bancoprovincia.com.ar" target="_blank">
        <div className="logo"></div>
      </Link>
      <div className="title">
        <div className="emma">
            <Link to='/' title="Museo Emma Nozzi">Museo Emma Nozzi</Link>
        </div>
        <div className="bapro">
            <Link to="http://museobancoprovincia.com" target="_blank">Banco Provincia de Buenos Aires</Link>
        </div>
      </div>
    </div>
  )
}

module.exports = FooterTitle;
