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
  


  it('should add and remove `is-pressed` and the ripple element', inject(function ($document) {
    var template = generateTemplate();
    var button = $compile(template)(scope);
    var body = $($document[0].body);
    var ripple;

    button.trigger('mousedown');
    expect(button.hasClass('is-pressed')).toBe(true);
    
    body.trigger('mouseup');
    ripple = button.find('v-ripple');
    
    expect(ripple[0]).toBeDefined();
    expect(button.hasClass('is-pressed')).toBe(false);
  }));

});