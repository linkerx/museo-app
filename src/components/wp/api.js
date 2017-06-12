var axios = require('axios');
var ApiURL = '/wp-json/wp/v2/';
var AddQuery = '?_embed';

module.exports = {
  getList: function(options){
    var url = options.url + ApiURL + options.type;

    if(options.queries){
      url += '?' + options.queries.map(function(query,index) {
        return (query)
      }).join('&');
    }

    console.log(url);

    return axios.get(url)
      .then(function (response) {
        return response.data;
      });
  },
  getItem: function(options){
    var url = options.url + ApiURL + options.type + '?slug=' + options.slug;
    console.log(url);
    return axios.get(url)
      .then(function (response) {
        return response.data;
      });
  }
}
