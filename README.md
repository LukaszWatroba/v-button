# AngularJS pressable button with a busy indicator

AngularJS directive inspired by Google material design allowing you to create buttons with a nice ripple effect and "busy" indicator.


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

Resoult html: when the button is pressed and the `isBusy` value is equal `true`

```html
<button class="Button is-busy is-pressed" ng-click="isBusy = !isBusy" v-busy="isBusy" v-busy-label="Please wait" v-pressable>
  <span>Please wait</span>
  <span class="Ripple"></span>
</button>
```


## Config

You can easly change the default class names to suit your style.


##### Example

```js
angular
  .module('myApp', [ 'vButton' ])

  .config(function (buttonConfig) {
    
    buttonConfig = {
      busyLabel: 'Please wait',                     // Default: Loading

      classes: {
        ripple: 'ripple',                           // Default: Ripple

        isBusyState: 'busy',                        // Default: is-busy
        isPressedState: 'pressed'                   // Default: is-pressed
      }
    }

  });
```
