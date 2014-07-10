(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.list', ['common.directives.dynamicTruncate']);

  module.controller('Feed.List', function($scope, photoCollection) {

    $scope.search = {};
    $scope.collection = photoCollection;

  });

})(window.angular);