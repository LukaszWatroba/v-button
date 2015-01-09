'use strict';

describe('vButton', function () {

  var dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };



  beforeEach(function () {
    dependencies = angular.module('vButton').requires;
  });

  
  
  it('should load config module', function () {
    expect(hasModule('vButton.config')).toBe(true);
  });


  it('should load directives module', function () {
    expect(hasModule('vButton.directives')).toBe(true);
  });

});