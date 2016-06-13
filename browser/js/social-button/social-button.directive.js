'use strict';

app.directive('socialButton', function () {
  return {
    scope: {
      providerName: '@'
    },
    restrict: 'E',
    templateUrl: '/js/social-button/social-button.html'
  }
});
