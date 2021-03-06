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
    	
  //     	$scope.sectionNews = {
		// 	name : 'news',
		// 	div : element,
		// 	isactive : false,
		// 	isgallery : false
		// }

		$scope.expand = false;

		$scope.expandNews = function(indice) {
			$scope.selectedNews = indice;
			$scope.expand = !$scope.expand;
		}

		$scope.resetNewsIndex = function(){
			$scope.selectedNews = null;
		}

      	var expression = attrs.newspage;

      	// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			element.hide().addClass('slideOutLeft');
		}

		$scope.$watch(expression,function( newValue, oldValue ) {

			if ( newValue === oldValue ) {
				element.hide();
			}

			// Show element.
			if ( newValue ) {



				$scope.currentSection = {
		          prev : $scope.currentSection.current,
		          current : element
		        }
		        
				var body = $document.find('body').eq(0);

				body.animate({scrollTop:0}, '500', 'swing', function() { 

					CommonMain.getNews().then( function(c) {
						// success
						if(c){
							$scope.newsObj = c;
							console.log(c)
						}
				    }, function(c) {
				      // request rejected (error)
				      $scope.newsObj = {};
				    });
				   	
				   	$scope.controlSlideAnimation.slideOut($scope.currentSection.prev);
			     	
			     	setTimeout(function(){
			     		
			     		$scope.controlSlideAnimation.slideIn($scope.currentSection.prev, $scope.currentSection.current);
			     		
			     		setTimeout(function(){
			     			$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
			     			$scope.resetActiveAll();
		    	     		$scope.newsIsVisible = true;
		    	     		$scope.newsIsActive = true;
			     		},200);
					},600);
				});
			// Hide element.
			} else {
				return;
			}
		});

      }
    };
  });
