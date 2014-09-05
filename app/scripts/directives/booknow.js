'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:booknow
 * @description
 * # booknow
 */
angular.module('skinandinkApp')
  .directive('booknow', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location, $timeout) {
    return {
      templateUrl: 'views/booknow.html',
      restrict: 'AE',
      link: function postLink($scope, element, attrs, $log) {

      	$scope.backBtn = $('.back_home');

            $scope.tattooArtistsName = [];

      	$scope.emailForm = {};

      	$scope.showFormConfirm = false;
      	$scope.showFormError = false;
      	$scope.confirmAgeMsg = false;

      	$scope.submitBooking = function(emailvalid){
      	  
      	  if (emailvalid){
      	  	if ($scope.emailForm.over_age != true){
      	  		$scope.confirmAgeMsg = true;
      	  	} else {
      	  		$scope.confirmAgeMsg = false;
      	  		CommonMain.sendEmail($scope.emailForm).then( function(d) {
      	  		  // success
      	  		  if(d){
      	  		    $scope.sendEmailConfirm = d;
      	  		    console.log($scope.sendEmailConfirm);
      	  		    if (d.success){
      	  		    	$scope.showFormConfirm = true;
      	  		    	$scope.showFormError = false;
      	  		      $scope.emailForm = {};
      	  		      $scope.messageAdd = '<span class="green"><i class="fa fa-check-square"></i> ' + d.msg + '</span>';
      	  		      $timeout(function(){
      	  		      	$scope.showFormConfirm = false;
      	  		      	$scope.showFormError = false;
      	  		      }, 6000);
      	  		    } else{
      	  		    	$scope.showFormError = true;
      	  		    	$scope.showFormConfirm = false;
      	  		        $scope.messageAdd = '<i class="fa fa-exclamation-triangle"></i> ' + d.msg +'. Please add it!';
      	  		        $timeout(function(){
      	  		        	$scope.showFormConfirm = false;
      	  		        	$scope.showFormError = false;
      	  		        }, 6000);
      	  		    }
      	  		    
      	  		  }
      	  		}, function(d) {
      	  		  // request rejected (error)
      	  		  scope.sendEmailConfirm = {};
      	  		});
      	  		return;
      	  	}
      	  	
      	  }
      	  
      	}

      	var expression = attrs.booknow;

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

				$scope.tattooArtistsName = [];
				for (var i = 0 ; i < $scope.globalInfo.tattoo.length ; i++){
					var tattooNames = {name: $scope.globalInfo.tattoo[i].title}
					$scope.tattooArtistsName.push (tattooNames);
				}


				$scope.currentSection = {
		          prev : $scope.currentSection.current,
		          current : element
		        }
		        
				var body = $document.find('body').eq(0);

				body.animate({scrollTop:0}, '500', 'swing', function() { 
				   	
				   	$scope.controlSlideAnimation.slideOut($scope.currentSection.prev);
			     	
			     	setTimeout(function(){
			     		
			     		$scope.controlSlideAnimation.slideIn($scope.currentSection.prev, $scope.currentSection.current);
			     		
			     		setTimeout(function(){
			     			$scope.backBtn.removeClass('slideOutUp').addClass('slideInDown');
			     			$scope.resetActiveAll();
		    	     		    $scope.bookNowIsVisible = true;
		    	     		    $scope.bookNowIsActive = true;
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
