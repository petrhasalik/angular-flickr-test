angular.module("flickerDemo").run(["$templateCache", function($templateCache) {$templateCache.put("feed/detail/detail.html","<section class=\"container-fluid detail\">\n  <div class=\"row\">\n    <div class=\"col-sm-3 col-sm-push-9\"><a class=\"btn btn-default btn-back\" href=\"#feed\">&larr; Back</a></div>\n    <div class=\"col-sm-9 col-sm-pull-3\"><h1><a ng-href=\"{{photo.link}}\">{{photo.title}}</a></h1></div>\n  </div>\n\n  <div class=\"row info\">\n    <div class=\"col-sm-12\">\n      <a ng-href=\"https://www.flickr.com/people/{{photo.author_id}}/\">Photo author</a> | \n      <span published-date=\"photo.published\"></span>  \n    </div>\n  </div>\n\n  <div class=\"row body\">\n    <div class=\"col-xs-5 col-sm-3 col-lg-2\"><img width=\"100%\" ng-src=\"{{photo.media.m}}\" /></div>\n    <div class=\"col-xs-7 col-sm-9 col-lg-10\">\n      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus est, congue ut nisl non, pulvinar cursus lectus. Integer tellus nulla, ultricies at scelerisque vitae, placerat ut odio. Phasellus porttitor facilisis mi, nec porta odio feugiat luctus. Donec nec nibh nec ante viverra laoreet eget in dolor. Ut luctus lobortis leo ac sagittis. Mauris erat massa, pharetra non ligula sit amet, tempus tincidunt ligula. Suspendisse viverra tempus odio, quis vehicula felis eleifend at. Ut luctus sem malesuada cursus vestibulum. Cras quis rhoncus nisi. Curabitur mollis dolor quis lectus mollis, ac euismod massa vehicula. Pellentesque rutrum dui semper ipsum porta, at venenatis ligula sollicitudin. In non leo eu lacus rutrum laoreet. Sed eu egestas sapien, sed pulvinar libero. Suspendisse potenti.</p>\n      Tags: <tag-links tags=\"photo.tags\"></tag-links>\n      <br>\n    </div>\n  </div>\n</section>\n\n\n");
$templateCache.put("feed/list/list.html","<section class=\"container-fluid list\" window-resize >\n  <h1>Flickr Public Feed</h1>\n\n  <div class=\"row list-item\" ng-repeat=\"photo in collection track by $index\">\n\n    <div class=\"image-box col-xs-3 col-sm-2 col-lg-1\">\n      <a ng-href=\"#feed/{{$index}}\">\n        <img ng-src=\"{{photo.media.m}}\" />\n      </a>\n    </div>\n\n    <div class=\"col-xs-9 col-sm-10 col-lg-11\">\n      <h2>\n        <a ng-href=\"#feed/{{$index}}\">\n          <dynamic-truncate text=\"photo.title\"></dynamic-truncate>\n        </a>\n      </h2>\n\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <span class=\"date\" published-date=\"photo.published\"></span>\n        </div>\n        <div class=\"col-sm-12\">\n          <a class=\"author\" ng-href=\"https://www.flickr.com/people/{{photo.author_id}}/\">Photo author</a>\n          <a class=\"flickr-link\" ng-href=\"{{photo.link}}\">View on Flickr</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row text-center\">\n    <button class=\"btn btn-primary btn-more\" ng-click=\"loadMore()\">Load more</button>\n  </div>\n\n</section>");
$templateCache.put("feed/detail/directives/tagList.html","<span ng-repeat=\"tag in tags\">\n  <a ng-href=\"#feed/?tags={{tag}}\">{{tag}}</a>\n</span>");}]);