/**
 * vButton - AngularJS pressable button with a busy indicator
 * @version v0.0.2
 * @link http://lukaszwatroba.github.io/v-button
 * @author Łukasz Wątroba <l@lukaszwatroba.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular) {
'use strict';



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




// vButton directive
angular.module('vButton.directives')
  .directive('vButton', vButtonDirective);


function vButtonDirective ($document, buttonConfig) {
  return {
    restrict: 'A',
    scope: {
      isBusy: '=busy',
      busyLabel: '@busyLabel'
    },
    compile: function (tElement, tAttrs) {
      var buttonLabelClass = buttonConfig.classes.buttonLabel;

      var bodyElement = angular.element($document[0].body),
          buttonLabelElement = angular.element(tElement[0].querySelector('.' + buttonLabelClass));

      if (angular.isDefined(tAttrs.busy)) {
        tElement.addClass(buttonConfig.classes.buttonBusyModifier);
      }

      if (!buttonLabelElement[0]) {
        var buttonHtml = tElement.html();
        tElement.html('<span class="' + buttonLabelClass + '">' + buttonHtml + '</span>');
        buttonLabelElement = angular.element(tElement[0].querySelector('.' + buttonLabelClass));
      }

      tElement.addClass(buttonConfig.classes.buttonPressableModifier);

      return function postLink (scope, iElement, iAttrs) {
        var idleLabelHtml = buttonLabelElement.html(),
            busyLabelHtml = scope.busyLabel || buttonConfig.busyLabel;

        function makeRipple (posX, posY) {
          var rect = iElement[0].getBoundingClientRect(),
              ripple = iElement[0].querySelector('.' + buttonConfig.classes.ripple);

          var top, left;

          angular.element(ripple).remove();

          ripple = $document[0].createElement('span');
          ripple.className = buttonConfig.classes.ripple;
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';

          iElement.append(ripple);

          left = posX - rect.left - ripple.offsetWidth / 2 - $document[0].body.scrollLeft;
          top = posY - rect.top - ripple.offsetHeight / 2 -  $document[0].body.scrollTop;
          ripple.style.left = left + 'px';
          ripple.style.top = top + 'px';
        }

        iElement.bind('mousedown touchstart', function (event) {
          makeRipple(event.pageX, event.pageY);

          iElement.addClass(buttonConfig.classes.isPressedState);

          bodyElement.bind('mouseup touchend', function (event) {
            iElement.removeClass(buttonConfig.classes.isPressedState);
            bodyElement.unbind('mouseup touchend');
          });
        });

        scope.$watch('isBusy', function (value) {
          if (value) {
            iElement.addClass(buttonConfig.classes.isBusyState);
            buttonLabelElement.html(busyLabelHtml);
          } else {
            iElement.removeClass(buttonConfig.classes.isBusyState);
            buttonLabelElement.html(idleLabelHtml);
          }
        });
      };
    }
  };
}
vButtonDirective.$inject = ['$document', 'buttonConfig'];
}(angular));