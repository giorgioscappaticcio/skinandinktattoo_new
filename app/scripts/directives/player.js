'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:player
 * @description
 * # player
 */
angular.module('skinandinkApp')
  .directive('player', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the player directive');
      }
    };
  });
