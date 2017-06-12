var React = require('react');
var Link = require('react-router-dom').Link;
require("./styles.less");

function SiteTitle() {
  return (
    <div className="site-title">
      <div className="logo">
          <img src="<?php echo get_template_directory_uri(); ?>/img/bp.png" />
      </div>
      <div className="title">
        <div className="emma">
            <Link to='/' title="Museo Emma Nozzi">Museo Emma Nozzi</Link>
        </div>
        <div className="bapro">
            <Link to="http://museobancoprovincia.com" target="_blank">Museo del Banco Provincia</Link>
        </div>
      </div>
    </div>
  )
}

module.exports = SiteTitle;
