

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

