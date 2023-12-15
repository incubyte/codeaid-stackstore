app.controller("AboutController", function ($scope, FullstackPics) {
  console.log(FullstackPics);
  // Images of beautiful Fullstack people.
  $scope.images = _.shuffle(FullstackPics);
});
