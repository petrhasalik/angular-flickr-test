(function(angular) {
  'use strict';

  angular.module('flickerDemo.feed', [
    'angularUtils.filters.ordinalDate',
    'flickerDemo.feed.list',
    'flickerDemo.feed.detail'
  ]);

})(window.angular);