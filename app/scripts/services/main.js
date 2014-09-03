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

  	this.getFBInfo = function(fbID){
  		var fbInfoAPI = "https://graph.facebook.com/"+fbID;
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

  	this.getFBPhotos = function(fbAlbum){
  		var fbInfoAPI = 'https://graph.facebook.com/'+fbAlbum+'/photos?limit=100';
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

	
	this.sendEmail = function(params){
  		//console.log(params)

  		var d = $q.defer();

  	  	$http({
  	  		method: 'GET', 
  	  		url: 'http://giorgioscappaticcio.co.uk/skin_ink/admin/queries/send_email.php',
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

