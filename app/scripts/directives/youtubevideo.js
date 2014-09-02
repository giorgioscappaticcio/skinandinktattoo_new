'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:youtubevideo
 * @description
 * # youtubevideo
 */
angular.module('skinandinkApp')
  .directive('youtubevideo', function ($sce) {
    return {
      templateUrl: 'views/youtubevideo.html',
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
      	
      	var video_id = attrs.codeurl.split('v=')[1];
      	var ampersandPosition = video_id.indexOf('&');
      	if(ampersandPosition != -1) {
      	  video_id = video_id.substring(0, ampersandPosition);
      	}
		scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + video_id);
      	
      }
    };
  });

