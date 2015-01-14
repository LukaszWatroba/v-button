(function (angular) {
  'use strict';

  angular
    .module('myApp', [ 'vButton' ])

    .config(function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    })

    .controller('MainController', function () { });

})(angular);