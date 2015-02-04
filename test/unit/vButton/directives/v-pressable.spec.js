describe('v-pressable directive', function () {

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

    var template = '<button v-pressable>Text</button>';

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
  


  it('should add a ripple element and `is-pressed` class on `touchstart` event', function () {
    var template = generateTemplate();
    var button = $compile(template)(scope);
    var ripple = button.find('v-ripple');

    expect(ripple[0]).not.toBeDefined();

    button.trigger('touchstart');
    ripple = button.find('v-ripple');
    
    expect(ripple[0]).toBeDefined();
    expect(button.hasClass('is-pressed')).toBe(true);
  });


  it('should remove `is-pressed` class on `touchend` event', inject(function ($document) {
    var template = generateTemplate();
    var button = $compile(template)(scope);
    var body = $($document[0].body);

    button.trigger('touchstart');
    expect(button.hasClass('is-pressed')).toBe(true);
    body.trigger('touchend');
    expect(button.hasClass('is-pressed')).toBe(false);
  }));

});