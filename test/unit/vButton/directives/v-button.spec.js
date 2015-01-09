describe('v-button directive', function () {

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

    var template = '<button ng-click="isBusy = !isBusy" v-button busy="isBusy"';
        template += (dafaults.busyLabel) ? ' busy-label="' + dafaults.busyLabel + '">' : '>';
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
  


  it('should add `Button--pressable` and `Button--busy` modifiers', function () {
    var template = generateTemplate();
    var button = $compile(template)(scope);

    expect(button.hasClass( buttonConfig.classes.buttonPressableModifier )).toBe(true);
    expect(button.hasClass( buttonConfig.classes.buttonBusyModifier )).toBe(true);
  });


  it('should wrap button text in a span with `Button-label` class', function () {
    var labelClass = buttonConfig.classes.buttonLabel;

    var template = generateTemplate();
    var button = $compile(template)(scope);
    var label = button.find('span.' + labelClass);

    expect(label[0]).toBeDefined();
    expect(label.text()).toBe('Text');
  });


  it('should add a ripple and `is-pressed` class on `mousedown` event', function () {
    var ripleClass = buttonConfig.classes.ripple;
    var pressedClass = buttonConfig.classes.isPressedState;

    var template = generateTemplate();
    var button = $compile(template)(scope);
    var riple = button.find( 'span.' + ripleClass );

    expect(riple[0]).not.toBeDefined();

    button.mousedown();
    riple = button.find( 'span.' + ripleClass );
    
    expect(riple[0]).toBeDefined();
    expect(button.hasClass( pressedClass )).toBe(true);
  });


  it('should remove `is-pressed` class on `mouseup` event', inject(function ($document) {
    var template = generateTemplate();
    var button = $compile(template)(scope);
    var pressedClass = buttonConfig.classes.isPressedState;
    var body = $($document[0].body);

    button.mousedown();
    expect(button.hasClass( pressedClass )).toBe(true);
    body.mouseup();
    expect(button.hasClass( pressedClass )).toBe(false);
  }));


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
    var busyClass = buttonConfig.classes.isBusyState;

    scope.isBusy = true;
    scope.$digest();

    expect(button.hasClass( busyClass )).toBe(true);

    scope.isBusy = false;
    scope.$digest();

    expect(button.hasClass( busyClass )).toBe(false);
  });


  it('should append `busy-label` attr value to `span` wrapper if button `isBusy`', function () {
    var busyLabel = 'Progress';

    var template = generateTemplate({ busyLabel: busyLabel });
    var button = $compile(template)(scope);
    var busyClass = buttonConfig.classes.isBusyState;

    scope.isBusy = true;
    scope.$digest();

    expect(button.html()).toContain(busyLabel);

    scope.isBusy = false;
    scope.$digest();

    expect(button.html()).not.toContain(busyLabel);
    expect(button.html()).toContain('Text');
  });

});