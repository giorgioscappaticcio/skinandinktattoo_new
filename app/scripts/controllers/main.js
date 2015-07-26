'use strict';

/**
 * @ngdoc function
 * @name skinandinkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skinandinkApp
 */
angular.module('skinandinkApp')
  .controller('MainCtrl', function ($scope, $log, CommonMain, $window, $rootScope) {

  	$scope.globalInfo = {};

    $scope.homeSection = {
      name : 'home',
      div : $('#h')
    }

    $scope.tattooSection = {
      name : 'tattoo'
    }

    $scope.newsSection = {
      name : 'news'
    }

    $scope.piercingSection = {
      name : 'piercing'
    }

    $scope.gallerySection = {
      name : 'gallery'
    }

    $scope.currentSection = {
      current : $scope.homeSection.div,
      prev : null,
      isTattooGallery : false,
      isGallery : false
    }

    ////////////////////////////
    //Jquery dom element
    ////////////////////////////

    $scope.backBtn = $('.back_home');
    $scope.homeSection = $('#h');
    $scope.artistsSection = $('div[singletattoo="singleTattooIsVisible"]');
    $scope.newsSection = $('div[newspage="newsIsVisible"]');


    ////////////////////////////
    //Window size control
    ////////////////////////////
    //$scope.windowHeight = (window.innerHeight - 80) + 'px';
    $scope.windowHeight = (window.innerHeight - 220) + 'px';
    $scope.fullHeight = (window.innerHeight) + 'px';


    ////////////////////////////
    // Reset control
    ////////////////////////////

    $scope.resetActiveLink = function(){
      $scope.piercIsActive = false;
      $scope.tattooIsActive = false;
      $scope.newsIsActive = false;
      $scope.bookNowIsActive = false;
    }

    $scope.resetActiveSection = function(){
        // Default the blocks to be visible.
        $scope.galleryIsVisible = false;
        $scope.singleTattooIsVisible = false;
        $scope.newsIsVisible = false;
        $scope.bookNowIsVisible = false;
        $scope.ispiercing = false;
        $scope.currentSection.isGallery = false;
    }

    $scope.resetActiveAll = function(){
      $scope.resetActiveLink();
      $scope.resetActiveSection();
      $scope.galleryLoaded = true;
      $scope.mainLoaded = true;
    }

    $scope.closePanel = function(){
      $scope.currentSection.prev = $scope.currentSection.current;
      $scope.currentSection.current = $scope.homeSection;

      $scope.backBtn.removeClass('slideInDown').addClass('slideOutUp');

      $scope.controlSlideAnimation.totalOut($scope.currentSection.prev, $scope.currentSection.current);
      $scope.resetActiveAll();
    }



    ////////////////////////////
    // Toggle control
    ////////////////////////////

    $scope.toggleGallery = function(album, ispiercing) {
      if ($scope.galleryIsVisible){
        $scope.currentSection.isGallery = true;
      }
      $scope.galleryIsVisible = true;
      $scope.fbAlbum = album;
      $scope.ispiercing = ispiercing;

      switch(album){
        case 'studio':
          $scope.fbAlbumId = $scope.globalInfo.general[0].fb_album;
          $scope.currentSection.isTattooGallery = false;
        break;
        case 'piercing':
          $scope.fbAlbumId = $scope.globalInfo.general[0].fb_piercing_album;
          $scope.currentSection.isTattooGallery = false;
        break;
        case 'tattoo':
          $scope.fbAlbumId = $scope.globalInfo.tattoo[$scope.tattooPosition].fb_album;
          $scope.currentSection.isTattooGallery = true;
        break;
        default :
          $scope.fbAlbumId = $scope.globalInfo.general[0].fb_album;
          $scope.currentSection.isTattooGallery = false;
        break;
      }
    };

    $scope.toggleTattoo = function() {
      $scope.singleTattooIsVisible = true;
    };

    $scope.toggleNews = function() {
      $scope.newsIsVisible = true;
    };

    $scope.toggleBookNow = function() {
      $scope.bookNowIsVisible = true;
    };

    //Init
    $scope.resetActiveAll();
    $scope.galleryLoaded = false;
    $scope.mainLoaded = false;

    $scope.controlSlideAnimation = {
      slideOut : function(prevSection){
        prevSection.removeClass('slideInLeft').addClass('slideOutLeft');
      },

      slideIn : function(prevSection, nextSection){
        prevSection.hide();
        nextSection.show().removeClass('slideOutLeft').addClass('slideInLeft');
      },

      totalOut : function (prevSection, nextSection){
        setTimeout(function(){
          $scope.controlSlideAnimation.slideOut(prevSection);
          setTimeout(function(){
              $scope.controlSlideAnimation.slideIn(prevSection, nextSection);
          },600);
        },200);
      }
    }

    $scope.center = {
  		latitude: 0,
  		longitude: 0
  	};

  	$scope.map = {
  		center: $scope.center,
  		zoom: 15,
  		draggable: true,
  		icon: 'images/skull.png',
  		control: {}
    };

	  $scope.fullBgCover = {
	    'width' : '100%',//$window.innerWidth + 'px',
	    'height' : '100%'//$window.innerHeight + 'px'
	  }






    CommonMain.getGeneralInfo().then( function(d) {

      if(d){
        console.log(d);
        $scope.globalInfo.general = d;
        $scope.fbAlbumId = $scope.globalInfo.general[0].fb_album;

        CommonMain.getToken().then(function(response){
          if (response) {
            $scope.token = response;
            $rootScope.token = response;

            CommonMain.getFBInfo($scope.globalInfo.general[0].fb_id, $scope.token).then( function(c) {
              // success

              if(d){
                $scope.infoObj = c;
                $log.debug('center', $scope.infoObj);
                $scope.center = {
                  latitude: c.location.latitude,
                  longitude: c.location.longitude
                }
                $log.debug('center', $scope.center);
                $scope.map.control.refresh($scope.center);
              }
            }, function(c) {
              // request rejected (error)
              $scope.infoObj = {};
            });

            CommonMain.getFBPhotos($scope.globalInfo.general[0].fb_album, $scope.token).then( function(c) {
              // success

              if(c){
                $scope.photosObj = c.data;
                $log.debug('photos', $scope.photosObj);
                $scope.mainLoaded = true;
              }
            }, function(c) {
              // request rejected (error)
              $scope.photosObj = {};
            });

          }
        });
      }
    }, function(d) {
      // request rejected (error)
      $scope.globalInfo = {};
    });

    CommonMain.getTattooInfo().then( function(c) {
      // success

      if(c){
        $scope.globalInfo.tattoo = c;
        console.log(c)
      }
    }, function(c) {
      // request rejected (error)
      $scope.globalInfo.tattoo = {};
    });

  });



