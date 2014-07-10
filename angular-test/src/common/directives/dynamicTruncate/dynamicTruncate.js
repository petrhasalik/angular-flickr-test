(function(angular) {
  'use strict';

  var module = angular.module('common.directives.dynamicTruncate', ['truncate']);

  module.directive('dynamicTruncate', function($filter) {
    return {
      restrict: 'E',
      require: '^windowResize',
      replace: true,
      scope: {
        text: '='
      },
      template: '<div>{{truncatedText}}</div>',
      compile: function() {
        var characterFilter = $filter('characters');

        return function(scope, element, args, sizeController) {
          scope.data = {};

          var truncateBySize = function(args) {
            var limit = Math.floor(args.width / 40);
            scope.truncatedText = characterFilter(scope.text, limit, true);
          };

          scope.$on('window::resize', function(event, size) {
            truncateBySize(size);
            scope.$apply();
          });

          truncateBySize(sizeController.getSize());

        };
      }
    };
  });

})(window.angular);