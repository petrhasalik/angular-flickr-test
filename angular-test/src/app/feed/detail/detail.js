(function(angular) {
  'use strict';

  var module = angular.module('flickerDemo.feed.detail', [
    'djds4rce.angular-socialshare',
    'flickerDemo.feed.detail.directives'
  ]);

  module.controller('Feed.Detail', function($scope, $location, photo) {

    $scope.photo = photo;
    $scope.detailLink = function(){
        return $location.absUrl();
    };
  });

})(window.angular);