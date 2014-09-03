'use strict';

/**
 * @ngdoc overview
 * @name skinandinkApp
 * @description
 * # skinandinkApp
 *
 * Main module of the application.
 */
angular
  .module('skinandinkApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'google-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });
