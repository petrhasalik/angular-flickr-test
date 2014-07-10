(function(angular) {
  'use strict';

  var app = angular.module('flickerDemo', [
    'ngRoute',
    'ngSanitize',
    'truncate',
    'common.directives.publishedDate',
    'common.directives.windowResize',
    'flickerDemo.feed'
  ]);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/feed', {
          templateUrl: 'feed/list/list.html',
          controller: 'Feed.List',
          resolve: {
            photoCollection: ['$route', 'publicFeedCollection', function($route, publicFeedCollection) {
                var tags = '';
                if ($route.current.params.hasOwnProperty('tags')) {
                  tags = $route.current.params.tags;
                }

                return publicFeedCollection.loadByTags(tags);
              }]
          }
        }).
        when('/feed/:photoId', {
          templateUrl: 'feed/detail/detail.html',
          controller: 'Feed.Detail',
          resolve: {
            photo: ['$route', 'publicFeedCollection', function($route, publicFeedCollection) {
                return publicFeedCollection.getPhoto($route.current.params.photoId);
              }]
          }
        }).
        otherwise({
          redirectTo: '/feed'
        });
    }]);

})(window.angular);