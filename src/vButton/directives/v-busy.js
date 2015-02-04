

// vBusy directive
angular.module('vButton.directives')
  .directive('vBusy', vBusyDirective);


function vBusyDirective ($document, buttonConfig) {
  return {
    restrict: 'A',
    scope: {
      isBusy: '=vBusy',
      busyLabel: '@vBusyLabel'
    },
    compile: function (tElement) {
      var labelElement = angular.element(tElement.find('span'));

      if (!labelElement[0]) {
        tElement.html( '<span>' + tElement.html() + '</span>' );
        labelElement = angular.element(tElement.find('span'));
      }

      return function postLink (scope, iElement) {
        var idleLabelHtml = labelElement.html(),
            busyLabelHtml = scope.busyLabel || buttonConfig.busyLabel;

        scope.$watch('isBusy', function (value) {
          if (value) {
            iElement.addClass(buttonConfig.states.busy);
            labelElement.html(busyLabelHtml);
          } else {
            iElement.removeClass(buttonConfig.states.busy);
            labelElement.html(idleLabelHtml);
          }
        });
      };
    }
  };
}
vBusyDirective.$inject = ['$document', 'buttonConfig'];

