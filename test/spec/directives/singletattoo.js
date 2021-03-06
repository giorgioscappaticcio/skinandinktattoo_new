'use strict';

describe('Directive: singletattoo', function () {

  // load the directive's module
  beforeEach(module('skinandinkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<singletattoo></singletattoo>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the singletattoo directive');
  }));
});
