# AngularJS pressable button

## Demos
  - [GitHub](http://lukaszwatroba.github.io/v-button)

## Installation
  - Use bower, or download files [from the github repo](./dist)
  ```shell
  bower install v-button
  ```
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
<button class="Button Button--default" v-button busy="isBusy" ng-click="buttonClick()">Busy Button</button>
```

## Config
You can easly change the default class names to suit your style.
For example:

```js
angular
  .module('myApp', [ 'vModal' ])

  .config(function (buttonConfig) {
    
    buttonConfig = {
      busyLabel: 'Please wait',                     // Default: `Loading`

      classes: {
        buttonPressableModifier: 'btn-pressable',   // Default: `Button--pressable`
        buttonBusyModifier: 'btn--busy',            // Default: `Button--busy`

        buttonLabel: 'btn-label',                   // Default: `Button-label`

        ripple: 'ripple',                           // Default: `Ripple`

        isBusyState: 'busy',                        // Default: `is-busy`
        isPressedState: 'pressed'                   // Default: `is-pressed`
      }
    }

  });
```