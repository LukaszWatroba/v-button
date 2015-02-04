

// Config
angular.module('vButton.config', [])
  .constant('buttonConfig', {
    busyLabel: 'Loading',

    states: {
      busy: 'is-busy',
      pressed: 'is-pressed'
    }
  });


// Modules
angular.module('vButton.directives', []);
angular.module('vButton',
  [
    'vButton.config',
    'vButton.directives'
  ]);

