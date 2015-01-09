

// Config
angular.module('vButton.config', [])
  .constant('buttonConfig', {
    busyLabel: 'Loading',

    classes: {
      buttonPressableModifier: 'Button--pressable',
      buttonBusyModifier: 'Button--busy',

      buttonLabel: 'Button-label',

      ripple: 'Ripple',

      isBusyState: 'is-busy',
      isPressedState: 'is-pressed'
    }
  });


// Modules
angular.module('vButton.directives', []);
angular.module('vButton',
  [
    'vButton.config',
    'vButton.directives'
  ]);

