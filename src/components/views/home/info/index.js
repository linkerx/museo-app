var React = require('react');
var FooterData = require('utils/footerData');
require('./styles.less');

function Info() {
  return (
    <section id='home-info' className='parallax-group'>
      <FooterData />
    </section>
  )
}

module.exports = Info;
