(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.list', [
      'common.directives.dynamicTruncate'
  ]);

  module.controller('Feed.List', function($scope,$route, photoCollection, publicFeedCollection) {

    $scope.search = {};
    $scope.collection = photoCollection;

    $scope.loadMore = function() {
        var tags = '';

        if ($route.current.params.hasOwnProperty('tags')) {
            tags = $route.current.params.tags;
        }

        return publicFeedCollection.loadMoreByTags(tags).then(function(response){
            angular.forEach(response.data.items, function(value, key){
                $scope.collection.push(value);
            });
        });
    };

  });

})(window.angular);