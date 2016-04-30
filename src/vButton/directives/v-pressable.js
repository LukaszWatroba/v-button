
function isTouchDevice () {
 return (('ontouchstart' in window) || (window.navigator.MaxTouchPoints > 0) || (window.navigator.msMaxTouchPoints > 0));
}

// vPressable directive
angular.module('vButton.directives')
  .directive('vPressable', vPressableDirective);


function vPressableDirective ($document, buttonConfig) {
  return {
    restrict: 'A',
    link: function (scope, iElement) {
      var isTouch = isTouchDevice(),
          pressEvent = (isTouch) ? 'touchstart' : 'mousedown',
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

      function pressButton () {
        iElement.addClass(buttonConfig.states.pressed);
        bodyElement.on(releaseEvent, releaseButton);
      }

      function releaseButton (event) {
        var posX, posY;
        
        if (isTouch) {
          posX = event.changedTouches[0].pageX;
          posY = event.changedTouches[0].pageY;
        } else {
          posX = event.pageX;
          posY = event.pageY;
        }
        
        makeRipple(posX, posY);
        
        iElement.removeClass(buttonConfig.states.pressed);
        bodyElement.off(releaseEvent, releaseButton);
      }

      iElement.on(pressEvent, pressButton);
      
      scope.$on('$destroy', function () {
        iElement.off(pressEvent, pressButton);
        bodyElement.off(releaseEvent, releaseButton);
      });
    }
  };
}
vPressableDirective.$inject = ['$document', 'buttonConfig'];

