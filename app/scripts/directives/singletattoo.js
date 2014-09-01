'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:singletattoo
 * @description
 * # singletattoo
 */
angular.module('skinandinkApp')
  .directive('singletattoo', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location) {
    return {
		templateUrl: 'views/singletattoo.html',
		restrict: 'AE',
		link: function link($scope, element, attrs, $log) {

			$scope.tattooPosition = 0;

			$scope.generalInfoLoaded = false;

			$scope.thumbLimit = 6;

		$scope.cover_w = 851;
		$scope.cover_h = 316;

		$scope.nextTattoo = function(){
				$scope.tattooPosition < $scope.tattooProfilePic.length - 1 ? $scope.tattooPosition++ : $scope.tattooPosition = 0;
		}

			$scope.prevTattoo = function(){
				$scope.tattooPosition > 0 ? $scope.tattooPosition-- : $scope.tattooPosition = $scope.tattooProfilePic.length - 1;
			}

			$scope.goToTattoo = function(indice){
				$scope.tattooPosition = indice;
			}

			$scope.updateFacebookCall = function(){

		    $scope.loaded = false;

		    CommonMain.getFBInfo($scope.globalInfo.tattoo[$scope.tattooPosition].fbID).then( function(c) {
			    	  // success
			    	 
			    	  	$scope.singleTattoInfoObj = c;
			    	
			    	}, function(c) {
			    	  // request rejected (error)
			    	  $scope.singleTattoinfoObj = {};
			    	});

			    	CommonMain.getFBPhotos($scope.globalInfo.tattoo[$scope.tattooPosition].fbAlbum).then( function(a) {
			    	    // success
			    	    if(a){
			    	    	$scope.singleTattooPhotosObj = a.data;
		                // set cover size
		                $scope.setCoverSize();
		                $scope.loaded = true;
			    	    }
			    	}, function(a) {
			    	      // request rejected (error)
			    	      $scope.singleTattooPhotosObj = {}
			    	});
			}

			$scope.navPosition = [];

			$scope.createTattooThumb = function(){
		    	for (var i = 0 ; i < $scope.globalInfo.tattoo.length; i++){
		    		var navPos = $scope.globalInfo.tattoo[i].navPosition;
		    		var name = $scope.globalInfo.tattoo[i].title;
		    		//console.log(navPos)
			    	CommonMain.getFBProfilePic($scope.globalInfo.tattoo[i].fbID, navPos, name).then( function(b) {
			    	    // success
			    	    if(b){
						$scope.tattooProfilePic.push({'url': b.url, 'id': b.navPos, 'name': b.name});
		                
			    	    	//console.log(b.navPos);
			    	    }
			    	}, function(b) {
			    	      // request rejected (error)
			    	      $scope.singleTattooProfilePicObj = {}
			    	});
			}
		}
			
			$scope.$watch('tattooPosition',function(oldValue, newValue){

				if (!$scope.generalInfoLoaded){
					return;
				} else {
					$scope.updateFacebookCall();
				}
			});

			$scope.setCoverSize = function (){
		    var coverImgW = document.getElementById('fbCoverImg').width;
		    var coverImgH= document.getElementById('fbCoverImg').height;
		    var real_img_h = ($scope.cover_w * coverImgH / coverImgW) - $scope.cover_h;
		    if (coverImgH <= $scope.cover_h){
		        $scope.coverStyle = {
		            'top': parseInt (real_img_h * $scope.singleTattoInfoObj.cover.offset_y / 100 * -1) + "px",
		            'height': $scope.cover_h,
		            'width': 'auto !important'
		        }
		    } else if (coverImgH > $scope.cover_h){
		        $scope.coverStyle = {
		            'top': parseInt (real_img_h * $scope.singleTattoInfoObj.cover.offset_y / 100 * -1) + "px" ,
		            'width': $scope.cover_w,
		            'height': 'auto !important'
		        }
		    }
		}
			   
			    
		    	
			$scope.closePanel = function(){
		    $('.back_home').removeClass('slideInDown').addClass('slideOutUp');
		    setTimeout(function(){
		        element.removeClass('slideInLeft').addClass('slideOutLeft');
		        setTimeout(function(){
		            element.hide();
		            $('#h').show().removeClass('slideOutLeft').addClass('slideInLeft');
		            $scope.singleTattooIsVisible = ! $scope.singleTattooIsVisible;
		        },600);
		    },200); 
		} 	
		    	
		    	
			 
			



			    

			    
			    


			// I am the TRUTHY expression to watch.
			var expression = attrs.singletattoo;

			
			// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			//element.hide().addClass('slideOutLeft');
		}

		// I watch the expression in $scope context to
		// see when it changes - and adjust the visibility
		// of the element accordingly.
		$scope.$watch(expression,function( newValue, oldValue ) {

		  	
			// Ignore first-run values since we've
			// already defaulted the element state.
			if ( newValue === oldValue ) {
				element.hide()
			}
			// Show element.
			if ( newValue ) {

				//reset thumb image array
				$scope.tattooProfilePic = [];
				// reset tattoo position
				$scope.tattooPosition = 0;
		        

				$scope.generalInfoLoaded = true;
				$scope.createTattooThumb();
				$scope.updateFacebookCall();
				$scope._Index = 0;

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
				return;
			// Hide element.
			} else {
				element.hide();
				 
			}
		});
		}
		};
		});