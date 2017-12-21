var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
require("./styles.less");

function SiteTitle() {
  return (
    <div className="site-title">
      <div className="bapro">
        <NavLink to="/banco-provincia" target="_blank">
          <div className="logo"></div>
        </NavLink>
      </div>
      <div className="title">
        <Link to='/' title="Museo Emma Nozzi">Museo Emma Nozzi</Link>
      </div>
      <div className="subtitle">
        Carmen de Patagones, Buenos Aires, Argentina
      </div>
    </div>
  )
}

module.exports = SiteTitle;
