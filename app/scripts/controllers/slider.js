'use strict';

/**
 * @ngdoc function
 * @name skinandinkApp.controller:SliderCtrl
 * @description
 * # SliderCtrl
 * Controller of the skinandinkApp
 */
angular.module('skinandinkApp')
 .controller('SliderController', function ($scope, CommonMain, $log) {
   $scope.images = [{
   	src: '/images/001.jpg',
   	title: 'Homepage 1'
   }, {
   	src: '/images/002.jpg',
   	title: 'Homepage 2' 
   }, {
   	src: '/images/003.jpg',
   	title: 'Homepage 3'
   }, {
   	src: '/images/004.jpg',
   	title: 'Homepage 4'
   }, {
   	src: '/images/005.jpg',
   	title: 'Homepage 5'
   }];
});
