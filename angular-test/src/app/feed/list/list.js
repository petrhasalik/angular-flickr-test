(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.list', [
      'common.directives.dynamicTruncate',
      'lrInfiniteScroll'
  ]);

  module.controller('Feed.List', function($scope, photoCollection) {

    $scope.search = {};
    $scope.collection = photoCollection;

    $scope.loadMore = function() {
        console.log('infinite');
    };

  });

})(window.angular);