var React = require('react');
var SiteTitle = require('./siteTitle');
var MenuTrigger = require('./menuTrigger');
require("./styles.less");

function Header(){
  return(
    <header>
      <SiteTitle />
      <MenuTrigger />
    </header>
  );
}

module.exports = Header;
