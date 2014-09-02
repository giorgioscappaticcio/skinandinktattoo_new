'use strict';

describe('Directive: youtubevideo', function () {

  // load the directive's module
  beforeEach(module('skinandinkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<youtubevideo></youtubevideo>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the youtubevideo directive');
  }));
});
