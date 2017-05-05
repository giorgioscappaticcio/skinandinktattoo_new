'use strict';

/**
 * @ngdoc service
 * @name skinandinkApp.Main
 * @description
 * # Main
 * Service in the skinandinkApp.
 */
angular.module('skinandinkApp')
  .service('CommonMain', function CommonMain($http, $q) {

    // Change this variable according to the environment
  	var callsUrl = 'http://skinandinktattoo.com/admin/queries/';

    var getAccessTokenUrl = 'https://graph.facebook.com/oauth/access_token?client_id=771740286268102&client_secret=55616699633ec469091c253ea45fb543&grant_type=client_credentials'

  	var GET_GENERAL_INFO = 'get_general_info.php';
  	var GET_TATTOO_INFO = 'get_tattoo_info.php';

  	var GET_NEWS = 'get_news_published.php'


  	this.getData = function() {


  	  var d = $q.defer();

  	  $http({method: 'GET', url: 'data/data.json'}).
	    success(function(data, status, headers, config) {
	    	var superData = data
	    	return d.resolve(superData)
	    }).
	    error(function(data, status, headers, config) {
	      return d.reject('you got a problem');
	    });

		return d.promise;
  	};

  	this.getGeneralInfo = function() {


  	  var d = $q.defer();

  	  $http({method: 'GET', url: callsUrl + GET_GENERAL_INFO}).
	    success(function(data, status, headers, config) {
	    	var superData = data
	    	return d.resolve(superData)
	    }).
	    error(function(data, status, headers, config) {
	      return d.reject('you got a problem');
	    });

		return d.promise;
  	};

    this.getToken = function(){

      var d = $q.defer();

      $http({method: 'GET', url: getAccessTokenUrl}).
        success(function(data, status, headers, config) {
          var superData = data
          return d.resolve(superData)
        }).
        error(function(data, status, headers, config) {
          return d.reject('you got a problem');
        });

      return d.promise;
    };

  	this.getTattooInfo = function() {


  	  var d = $q.defer();

  	  $http({method: 'GET', url: callsUrl + GET_TATTOO_INFO}).
	    success(function(data, status, headers, config) {
	    	var superData = data
	    	return d.resolve(superData)
	    }).
	    error(function(data, status, headers, config) {
	      return d.reject('you got a problem');
	    });

		return d.promise;
  	};

  	this.getFBInfo = function(fbID, accessToken){


          var fbInfoAPI = "https://graph.facebook.com/"+ fbID + "?fields=name,description,about,cover,location,phone&access_token=" + accessToken;

          var d = $q.defer();

          $http({method: 'GET', url: fbInfoAPI}).
            success(function(data, status, headers, config) {
              var superData = data
              return d.resolve(superData)
            }).
            error(function(data, status, headers, config) {
              return d.reject('you got a problem');
            });

          return d.promise;

    };

  	this.getFBPhotos = function(fbAlbum, accessToken){

      var fbInfoAPI = 'https://graph.facebook.com/'+fbAlbum+'?fields=photos.limit(100000).fields(source)&access_token=' + accessToken;

      var d = $q.defer();

      $http({method: 'GET', url: fbInfoAPI}).
        success(function(data, status, headers, config) {
          var superData = data.photos;
          return d.resolve(superData)
        }).
        error(function(data, status, headers, config) {
          return d.reject('you got a problem');
        });

      return d.promise;
    };

  	this.getFBProfilePic = function(fbID, navpos, name){
  		var fbProfilePic = "https://graph.facebook.com/"+fbID+"/?fields=picture.type(large)";
		var d = $q.defer();

		$http({method: 'GET', url: fbProfilePic}).
			success(function(data, status, headers, config) {
				var superData = {}
				superData.url = data.picture.data.url;
				superData.navPos = navpos;
				superData.name = name;

				return d.resolve(superData)
			}).
			error(function(data, status, headers, config) {
				return d.reject('impossible to get fb profile pictures');
			});

		return d.promise;
	};

	this.getNews = function() {


  	  var d = $q.defer();

  	  $http({method: 'GET', url: callsUrl + GET_NEWS}).
	    success(function(data, status, headers, config) {
	    	var superData = data
	    	return d.resolve(superData)
	    }).
	    error(function(data, status, headers, config) {
	      return d.reject('you got a problem');
	    });

		return d.promise;
  	};


	this.sendEmail = function(params){
  		//console.log(params)

  		var d = $q.defer();

  	  	$http({
  	  		method: 'GET',
  	  		url: callsUrl + 'send_email.php',
  	  		params: params
  	  	}).
	    success(function(data, status, headers, config) {
	    	//console.log (data)
	    	var superData = data;
	    	return d.resolve(superData)
	    }).
	    error(function(data, status, headers, config) {
	      return d.reject('you got a problem');
	    });

		return d.promise;
  	}




  });

