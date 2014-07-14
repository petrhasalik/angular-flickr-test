(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.list', [
    'common.directives.dynamicTruncate'
  ]);

  module.controller('Feed.List', function($scope, $routeParams, photoCollection, publicFeedCollection) {

    $scope.search = {};
    $scope.collection = photoCollection;

    $scope.loadMore = function() {
      var tags = '';
      if ($routeParams.hasOwnProperty('tags')) {
        tags = $routeParams.tags;
      }

      return publicFeedCollection.loadMoreByTags(tags).then(function(response) {
        Array.prototype.push.apply($scope.collection, response.data.items);
      });
    };

  });

})(window.angular);