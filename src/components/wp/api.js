var axios = require('axios');

/**
 * Api Variables
 */
var WpUrl = 'http://admin.emmanozzi.org';
var WpApiDir = '/api';

var WpRoute = '/wp/v2';
var LnkRoute = '/lnk/v1';
var MenuRoute = '/wp-api-menus/v2';

var LnkSitesEndpoint = '/sites';
var LnkSitesPostsEndpoint = '/sites-posts';
var MenuLocationsEndpoint = '/menu-locations';
var MenusEndpoint = '/menus';

var AddQuery = '?_embed';

module.exports = {
  /**
   * Lista de Posts
   */
  getList: function(options){

    var url_base = WpUrl;
    if(options.url)
      url_base = options.url;

    var url = url_base + WpApiDir + WpRoute + '/';

    if(options.debug)
      console.log('getList InitialUrl: '+url);

    return this.getTypes(url_base)
       .then(function(types){

          if(options.debug)
            console.log('type: '+ options.type);

          var found = Object.keys(types).indexOf(options.type);
          if(found == -1){
            var found = Object.keys(types).indexOf(options.type.slice(0,-1));
          }

          if(options.type == 'media') {
            found = 1;
          }

          if(found != -1) {
            url += options.type;
          } else {
            url += 'posts/';

            if(!options.queries) {
              options.queries = [];
            }

            options.queries.push('filter[cat]='+options.type);
          }

          if(options.queries){
            url += '?' + options.queries.map(function(query,index) {
              return (query)
            }).join('&');
          }

          if(options.debug)
            console.log('getList finalUrl: '+url);

          return axios.get(url)
            .then(function (response) {
              return response.data;
            });
      }.bind(this));
  },

  /**
   * Un Item en particular
   */
  getItem: function(options){

    var url = WpUrl
    if(options.url)
      url = options.url;

    /**
     * si type es un tipo de dato va enla url,
     * sino busca solo el slug
     */

    return this.getTypes(url)
       .then(function(types){
          var url = WpUrl + WpApiDir + WpRoute + '/'; // + options.type + '/?slug=' + options.slug;
          var found = Object.keys(types).indexOf(options.type);
          if(found == -1){
            found = Object.keys(types).indexOf(options.type.slice(0,-1));
          }

          if(options.type == 'media') {
            found = 1;
          }

          if(found != -1) {
            url += options.type;
          } else {
            url += 'posts';
          }

          url += '/?slug=' + options.slug;

          if(options.queries){
              url += '&' + options.queries.map(function(query,index) {
                return (query)
              }).join('&');
          }

          return axios.get(url)
            .then(function (response) {
              return response.data;
            });

      });
  },

  getTypes: function(url){
    if(!url)
      url = WpUrl;

    url += WpApiDir + WpRoute + '/types';

    return axios.get(url)
      .then(function (response){
        return response.data;
      });
  },

  /**
   * Menu por Posicion
   */
  getMenuItemsByLocation: function(options){

    var url = WpUrl
    if(options.url)
      url = options.url;

    url += WpApiDir + MenuRoute + MenuLocationsEndpoint + '/' + options.location;

    if(options.debug){
      console.log(url);
    }

    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  /**
   * Menu ID por Posicion
   */
   getMenuIdByLocation: function(options){

     var url = WpUrl;
     var url2 = WpUrl;
     if(options.url){
       url = options.url;
       url2 = options.url;
     }

     url += WpApiDir + MenuRoute + MenuLocationsEndpoint;
     url2 += WpApiDir + MenuRoute + MenusEndpoint;

     if(options.debug){
       console.log(url);
     }

     return axios.get(url)
       .then(function(response){
         if(response.data[options.location]) {
           var url3 = url2 + '/' + response.data[options.location].ID;
           return axios.get(url3)
            .then(function(response){
              return response.data;
            });
         }
       });
   },

  /**
   * Sitio unico
   */
  getSite: function(options){
    var url = WpUrl + WpApiDir + LnkRoute + LnkSitesEndpoint + '/' + options.name;
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  /**
   * Lista de Sitios de la Red (Wordpress Multisite)
   */
  getSitesList: function(){
    var url = WpUrl + WpApiDir + LnkRoute + LnkSitesEndpoint;
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  /**
   * Lista de Post de todos los Sitios
   */
  getSitesPosts: function(){
    var url = WpUrl + WpApiDir + LnkRoute + LnkSitesPostsEndpoint
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  getDocumentos: function(site){
    var url = WpUrl + WpApiDir + LnkRoute + '/documentos/' + site;
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  }

}
