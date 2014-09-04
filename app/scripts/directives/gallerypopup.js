'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:gallerypopup
 * @description
 * # gallerypopup
 */
angular.module('skinandinkApp')
  .directive('gallerypopup', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location) {
    return {
      templateUrl: 'views/gallerypopup.html',
      restrict: 'AE',
      link: function link($scope, element, attrs, $log) {
      
      	////////////////////////////
      	// Initial variable control 
      	////////////////////////////
      	var fbAlbumId = null;

      	////////////////////////////
  		// Picture Slider control
  		////////////////////////////

      	$scope.photos = [];

      	// initial image index
      	$scope._Index = 0;

      	// if a current image is the same as requested image
      	$scope.isActive = function (index) {
      	    return $scope._Index === index;
      	};

      	// show prev image
      	$scope.showPrev = function () {
      	    $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
      	};

      	// show next image
      	$scope.showNext = function () {
      	    $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
      	};

      	// show a certain image
      	$scope.showPhoto = function (index) {
      	    $scope._Index = index;
      	};

      	////////////////////////////
      	// Close Button control 
      	////////////////////////////

      	$scope.closeBtn = function(){
      		
      		$scope.resetActiveAll();
            
            if ($scope.currentSection.isTattooGallery){
	        	$scope.singleTattooIsVisible = true;
	        	$scope.tattooIsActive = true;
	        	$scope.currentSection.prev = $scope.currentSection.current;
				$scope.currentSection.current = $scope.artistsSection;
	        } else {
	        	$scope.currentSection.prev = $scope.currentSection.current;
				$scope.currentSection.current = $scope.homeSection;
	        }

	        $scope.controlSlideAnimation.totalOut($scope.currentSection.prev, $scope.currentSection.current);

      	}

      	////////////////////////////
      	// Toggle directive control 
      	////////////////////////////

      	// I am the TRUTHY expression to watch.
      	var expression = attrs.gallerypopup;

      	// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			// ?
		}

		// Call the service to get the data
		//CommonMain.getData().then( function(d) {
		  // if success
		  //if(d){
		  	// I watch the expression in $scope context to
			// see when it changes - and adjust the visibility
			// of the element accordingly.
		    $scope.$watch(expression,function( newValue, oldValue ) {
		    	
		    	
		    	// Define fbAlbumId based on $scope.fbAlbum in main.js
		    	// Basically choose which album of picture to open
		    	// Because is the same directive called in different place
		      	

		      			      	
		      	// Ignore first-run values since we've
		    	// already defaulted the element state.
		    	if ( newValue === oldValue ) {
		    		element.hide();
		    	}
		    	// Show element.
		    	if ( newValue ) {

			      	//empty the object with the pictures
		      		$scope.photos = [];

		      		//Call the FB graph API to get the pictures
		      		CommonMain.getFBPhotos($scope.fbAlbumId).then( function(d) {
		      			// if success
		      			if(d){
		      				$scope.photosObjGallery = d.data;
		      				for (var i=0; i<d.data.length; i++){
		      					var pictures = {
		      						src: d.data[i].images[0].source, 
		      						thumb:d.data[i].images[d.data[i].images.length -1].source
		      						}
		      					$scope.photos.push(pictures);
		      				}
		      			}
		    		}, function(d) {
		      			// request rejected (error)
		      			$scope.photosObjGallery = {};
		      		});


		    		$scope.currentSection.prev = $scope.currentSection.current;
			        $scope.currentSection.current = element;
			        

		   			$scope._Index = 0;
		    		
		    		var body = $document.find('body').eq(0);
		    		
		    		body.animate({scrollTop:0}, '500', 'swing', function() { 
		    		   	
						$scope.controlSlideAnimation.slideOut($scope.currentSection.prev);
		    		   	
						setTimeout(function(){
		    	     		
		    	     		$scope.controlSlideAnimation.slideIn($scope.currentSection.prev, $scope.currentSection.current);
		    	     		
		    	     		setTimeout(function(){
		    	     			$scope.backBtn.removeClass('slideOutUp').addClass('slideInDown');
		    	     			if ($scope.ispiercing){
					              $scope.piercIsActive = true;
					            }
		    	     			$scope.resetActiveSection();
		    	     			$scope.galleryIsVisible = true;
		    	     			if ($scope.currentSection.isTattooGallery){
		    	     				$scope.singleTattooIsVisible = true;
		    	     				$scope.tattooIsActive = true;
		    	     			}
		    	     		},200);	
		    	     	},600);
		    		});

		    	// Hide element.
		    	} else {
		    		if(element.is(":visible")){
		    			$('.back_home').removeClass('slideInDown').addClass('slideOutUp');
		    			setTimeout(function(){
		    				element.removeClass('slideInLeft').addClass('slideOutLeft');
		    				setTimeout(function(){
		    					element.removeClass('slideOutLeft').addClass('slideInLeft');
		    					setTimeout(function(){
		    						$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
		    					},200);
		    				},600);
		    			},200);
		    		} 
		    	}
		    });
		  //}
		//}, function(d) {
		  // request rejected (error)
		  //$scope.globalInfo = {};
		//});

	   }
    };
  });
