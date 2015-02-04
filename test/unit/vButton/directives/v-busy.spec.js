describe('v-busy directive', function () {

  var $compile;
  var buttonConfig;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      busyLabel: null
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<button ng-click="isBusy = !isBusy" v-busy="isBusy"';
        template += (dafaults.busyLabel) ? ' v-busy-label="' + dafaults.busyLabel + '">' : '>';
        template += 'Text';
        template += '</button>';

    return template;
  };



  beforeEach(module('vButton'));

  beforeEach(inject(function ($rootScope, _$compile_, _buttonConfig_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
    buttonConfig = _buttonConfig_;
  }));

  afterEach(function () {
    scope.$destroy();
  });



  it('should change scope `isBusy` boolean to `true` on click', function () {
    var template = generateTemplate();
    var button = $compile(template)(scope);

    scope.isBusy = false;

    button.click();
    scope.$digest();

    expect(scope.isBusy).toBe(true);
  });


  it('should add `is-busy` class only if `isBusy` is equal `true`', function () {
    var template = generateTemplate();
    var button = $compile(template)(scope);

    scope.isBusy = true;
    scope.$digest();

    expect(button.hasClass('is-busy')).toBe(true);

    scope.isBusy = false;
    scope.$digest();

    expect(button.hasClass('is-busy')).toBe(false);
  });


  it('should replace button html with `busy-label` attr value if `isBusy` is equal `true`', function () {
    var busyLabel = 'Progress';

    var template = generateTemplate({ busyLabel: busyLabel });
    var button = $compile(template)(scope);

    scope.isBusy = true;
    scope.$digest();

    expect(button.html()).toContain(busyLabel);

    scope.isBusy = false;
    scope.$digest();

    expect(button.html()).not.toContain(busyLabel);
    expect(button.html()).toContain('Text');
  });

});