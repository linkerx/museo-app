var React = require('react');
var WpMenu = require('wp/menu');
require('./styles.less');
require('./items.less');

function FooterMenu(){
    return (
      <div className='footer-menu' >
        <WpMenu url='https://admin.emmanozzi.org' location='main-menu-location' debug={false} />
      </div>
    )
}

module.exports = FooterMenu;
