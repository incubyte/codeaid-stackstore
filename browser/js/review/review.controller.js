app.controller("ReviewCtrl", function ($scope, ReviewFactory, $window) {
  //$scope.reviews = reviewListing;
  $scope.addReview = function (review) {
    ReviewFactory.addReview(review).then(function () {
      $window.location.reload;
    });
  };
});
