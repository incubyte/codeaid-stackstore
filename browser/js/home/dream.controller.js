app.controller("DreamsCtrl", function ($scope, DreamsFactory) {
  $scope.dreams;

  DreamsFactory.getAll().then(function (dreams) {
    dreams.forEach(function (dream) {
      dream.imageUrl = "/images/" + dream.photo + ".jpg";
    });
    $scope.dreams = dreams;
  });
});
