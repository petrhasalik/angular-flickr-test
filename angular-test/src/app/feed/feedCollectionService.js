(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed');
  /**
   * Feed resource provide http comunication with flickr API
   */
  module.factory('publicFeedResource', function($http) {

    return {
      load: function(tags) {
        tags = tags || '';
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';
        if (tags.length > 0) {
          url += '&tagmode=all&tags=' + encodeURIComponent(tags);
        }

        return $http.jsonp(url);
      }
    };
  });

  /**
   * Feed collection
   */
  module.service('publicFeedCollection', function($q, $location, publicFeedResource) {
    this.data = [];
    this.tags = null;
    /**
     * 
     * @param {string} coma separed tags
     * @returns {Array|promise}
     */
    this.loadByTags = function(tags) {
      if (this.tags === tags) {
        return this.data;
      }

      this.tags = tags;
      return this.loadPhotos_();
    };

    /**
     * Fresh data
     * @param {string} coma separed tags
     * @returns {promise}
     */
    this.loadMoreByTags = function(tags) {
      return publicFeedResource.load(tags);
    };
    
    /**
     * @private
     * @returns {promise}
     */
    this.loadPhotos_ = function() {
      return publicFeedResource.load(this.tags).then(this.processResponse_.bind(this));
    };
    
    /**
     * @private
     * @returns {Array}
     */
    this.processResponse_ = function(response) {
      this.data = response.data.items;
      return this.data;
    };
    
    /**
     * @param {number} id
     * @returns {Object|promise}
     */
    this.getPhoto = function(id) {
      if (this.data.length > 0) {
        return this.data[id];
      }

      if (id > 20) {
        id = 1; //reset to begin if detail of more loaded picture is refreshed
      }

      return this.loadPhotos_().then(function(data) {
        return data[id];
      });
    };
  });

})(window.angular);

