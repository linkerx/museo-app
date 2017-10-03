var React = require('react');
var WpItem = require('wp/item');

function WpSitePost(props){
  return (
    <section id='site-post' className={props.type}>
      <WpItem type={props.type} slug={props.match.params.slug} debug={false} />
    </section>
  )
}

module.exports = WpSitePost;
