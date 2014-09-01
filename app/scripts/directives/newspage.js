'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:newspage
 * @description
 * # newspage
 */
angular.module('skinandinkApp')
  .directive('newspage', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location) {
    return {
      templateUrl: 'views/newspage.html',
      restrict: 'AE',
      link: function postLink($scope, element, attrs, $log) {
    	
      	var expression = attrs.newspage;

      	// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			element.hide().addClass('slideOutLeft');
		}

		$scope.$watch(expression,function( newValue, oldValue ) {

			if ( newValue === oldValue ) {
				return;
			}

			// Show element.
			if ( newValue ) {
		        
		        if ($scope.galleryIsVisible){
		            var elementToHide = $('div[gallerypopup="galleryIsVisible"]');
		            setTimeout(function(){
		                $scope.galleryIsVisible = ! $scope.galleryIsVisible;
		            },700);
		        } else {
		            var elementToHide = $('#h');
		        }
				var body = $document.find('body').eq(0);
				body.animate({scrollTop:0}, '500', 'swing', function() { 
				   	elementToHide.removeClass('slideInLeft').addClass('slideOutLeft');
			     	setTimeout(function(){
			     		elementToHide.hide();
			     		element.show().removeClass('slideOutLeft').addClass('slideInLeft');
			     		setTimeout(function(){
			     			$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
			     		},200);

			     	},600);
				});
				
			// Hide element.
			} else {
				element.hide();
			}
		});

      }
    };
  });
