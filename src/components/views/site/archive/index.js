var React = require('react');
var WpList = require('wp/list');

function WpSiteArchive(props){
  return (
    <section id='site-archive' className={props.type}>
      <WpList type={props.type} />
    </section>
  )
}

module.exports = WpSiteArchive;
