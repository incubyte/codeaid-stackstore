'use strict';

app.directive('dreamList', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/dreams/templates/dream-list.html',
    scope: {
      theDreams: '='
    }
  };
});