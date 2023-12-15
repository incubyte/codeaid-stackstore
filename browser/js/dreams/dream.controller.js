app.controller("DreamingCtrl", function ($scope, ProductFactory) {
  ProductFactory.getAllDreams().then(function (dreams) {
    $scope.dreams = dreams;
  });
});
