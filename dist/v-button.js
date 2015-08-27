/**
 * vButton - AngularJS pressable button with a busy indicator
 * @version v1.1.1
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




// vBusy directive
angular.module('vButton.directives')
  .directive('vBusy', vBusyDirective);


function vBusyDirective ($document, buttonConfig) {
  return {
    restrict: 'A',
    scope: {
      isBusy: '=vBusy',
      busyLabel: '@vBusyLabel',
      busyText: '@vBusyText'
    },
    compile: function (tElement, tAttrs) {
      var labelElement = angular.element(tElement.find('span'));

      if (!labelElement[0]) {
        tElement.html( '<span>' + tElement.html() + '</span>' );
        labelElement = angular.element(tElement.find('span'));
      }

      return function postLink (scope, iElement) {
        var idleLabelHtml = labelElement.html(),
            busyLabelHtml = scope.busyLabel || buttonConfig.busyLabel,
            busyTextHtml = scope.busyText;

        scope.$watch('isBusy', function (value) {
          if (value) {
            iElement.addClass(buttonConfig.states.busy);
            labelElement.html(busyLabelHtml);
          } else {
            iElement.removeClass(buttonConfig.states.busy);
            labelElement.html(busyTextHtml || idleLabelHtml);
          }
        });

        tAttrs.$observe('vBusyLabel', function(value) {
          busyLabelHtml = value;
        });

        tAttrs.$observe('vBusyText', function(value) {
          busyTextHtml = value;
        });
      };
    }
  };
}
vBusyDirective.$inject = ['$document', 'buttonConfig'];



// vPressable directive
angular.module('vButton.directives')
  .directive('vPressable', vPressableDirective);


function vPressableDirective ($document, buttonConfig) {
  return {
    restrict: 'A',
    link: function (scope, iElement) {
      var isTouch = !!('undefined' !== typeof $document[0].documentElement.ontouchstart);
      var pressEvent = (isTouch) ? 'touchstart' : 'mousedown',
          releaseEvent = (isTouch) ? 'touchend' : 'mouseup';

      var bodyElement = angular.element($document[0].body);

      function makeRipple (posX, posY) {
        var rect = iElement[0].getBoundingClientRect(),
            ripple = iElement[0].querySelector('v-ripple');

        var top, left;

        angular.element(ripple).remove();

        ripple = $document[0].createElement('v-ripple');
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';

        iElement.append(ripple);

        left = posX - rect.left - ripple.offsetWidth / 2 - bodyElement[0].scrollLeft;
        top = posY - rect.top - ripple.offsetHeight / 2 -  bodyElement[0].scrollTop;
        ripple.style.left = left + 'px';
        ripple.style.top = top + 'px';
      }

      function pressButton (event) {
        makeRipple(event.pageX, event.pageY);
        iElement.addClass(buttonConfig.states.pressed);

        bodyElement.bind(releaseEvent, releaseButton);
      }

      function releaseButton (event) {
        iElement.removeClass(buttonConfig.states.pressed);
        bodyElement.unbind(releaseEvent, releaseButton);
      }

      iElement.bind(pressEvent, pressButton);
    }
  };
}
vPressableDirective.$inject = ['$document', 'buttonConfig'];


}(angular));