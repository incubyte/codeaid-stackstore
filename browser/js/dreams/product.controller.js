app.controller(
  "ProductCtrl",
  function (
    $scope,
    $http,
    productListing,
    ProductFactory,
    AuthService,
    ReviewFactory,
    dreamReviews
  ) {
    $scope.product = productListing;
    $scope.user = null;
    if (dreamReviews.length) $scope.reviews = dreamReviews;
    else $scope.reviews = false;
    $scope.showForm = false;

    $scope.dropdown = Array.apply(null, Array($scope.product.quantity)).map(
      function (el, i) {
        return i + 1;
      }
    );

    var setUser = function () {
      AuthService.getLoggedInUser().then(function (user) {
        if (user) $scope.user = user;
        else $scope.user = false;
      });
    };

    setUser();

    $scope.sendReview = function (review) {
      $scope.errorReview = null;
      review.dreamId = $scope.product.id;
      review.userId = $scope.user.id;

      ReviewFactory.addReview(review)
        .then(function () {
          console.log("added a review from " + review.userId);
          $window.location.reload();
        })
        .catch(function () {
          $scope.errorLogin = "Invalid review";
        });
    };

    $scope.addDreamToCart = function (userId, product) {
      return $http
        .post("/api/cart/", { product: product, amount: $scope.amount })
        .then(function (userInfo) {
          return userInfo.data;
        })
        .then(function (userInfo) {
          product.quantity -= $scope.amount;
        });
    };

    $scope.toggle = function () {
      $scope.showForm = !$scope.showForm;
    };
  }
);
