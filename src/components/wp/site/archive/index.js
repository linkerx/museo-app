var React = require('react');
var WpList = require('wp/list');
require('./styles.less');

function WpSiteArchive(props){

  var site = "/";
  if(props.site){
    site = '/'+props.site;
  }

  //console.log(props);

  var queries = [
    '_embed',
  ];

  if(props.category){
      queries.push('categories='+props.category);
      queries.push('per_page=12');
  }

  var archiveName = props.type+'s';

  if(props.type == 'posts'){
    archiveName = 'sarasa';
    if(props.category){
      archiveName = props.category_name;
    }
  }

  var imageRender = 'back';
  if(props.imageRender){
    imageRender = props.imageRender;
  }

  var imageSize = 'thumbnail';
  if(props.imageSize){
    imageSize = props.imageSize;
  }

  var heading = 2;
  if(props.heading){
    heading = props.heading;
  }

  var page = 1;
  if(props.page){
    page = props.page;
  }

  return (
    <section id='site-archive' className={props.type}>
      <h1>{archiveName}</h1>
      <WpList
        site={props.site}
        type={props.type}
        ready={props.ready}
        queries={queries}
        debug={false}
        imageRender={imageRender}
        imageSize={imageSize}
        imageLink={true}
        heading={2}
        showPagination={true}
        itemsPerPage={12}
        page={page}
      />
    </section>
  )
}

module.exports = WpSiteArchive;
