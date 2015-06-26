# AngularJS pressable button with a busy indicator

AngularJS directives allow you to create buttons with a nice ripple effect and "busy" indicator. Inspired by [Google material design](http://www.google.com/design/spec/material-design/introduction.html).


## Demos

  - [GitHub](http://lukaszwatroba.github.io/v-button)
  - [CodePen](http://codepen.io/LukaszWatroba/pen/YPNvpX)


## Installation

  - Use [bower](http://bower.io/) `bower install v-button`, or download files [from the github repo](./dist)
  - Reference `v-button.css` and `v-button.js` in your index.html file
  - Reference the module in your app: `angular.module('myApp', [ 'vButton' ])`


## Usage

> app.js

```javascript
angular.module('myApp', ['vButton'])

.controller('MyCtrl', function ($scope) {
  $scope.isBusy = false;

  $scope.buttonClick = function () {
    $scope.isBusy = !$scope.isBusy;
  };
});
```

> index.html

```html
<button class="Button" ng-click="isBusy = !isBusy" v-busy="isBusy" v-busy-label="Please wait" v-pressable>Busy Button</button>
```

Result html: (if button is pressed and the `isBusy` value is equal `true`)

```html
<button class="Button is-busy is-pressed" ng-click="isBusy = !isBusy" v-busy="isBusy" v-busy-label="Please wait" v-pressable>
  <span>Please wait</span>
  <v-ripple></v-ripple>
</button>
```

When working with attribute having dynamic values (here we have an example with angular-translate), you may do it like this:

```html
<button class="Button" ng-click="isBusy = !isBusy" v-busy="isBusy" v-busy-label="{{'translation_key' | translate}}" v-busy-text="{{'translation_key' | translate}}"  v-pressable><span translate>translation_key</span></button>
```

