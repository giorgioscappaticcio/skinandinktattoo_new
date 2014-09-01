'use strict';

/**
 * @ngdoc directive
 * @name skinandinkApp.directive:singletattoo
 * @description
 * # singletattoo
 */
angular.module('skinandinkApp')
  .directive('singletattoo', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the singletattoo directive');
      }
    };
  });
