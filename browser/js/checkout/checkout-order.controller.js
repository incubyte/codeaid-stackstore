"use strict";

app.controller("CheckoutCtrl", function ($scope, user, $http) {
  $scope.user = user;
  $scope.order;
  $scope.submitOrder = function () {
    console.log("SHIPPING", $scope.shipping, "BILLING", $scope.billing);
    $http
      .put("/api/users/", {
        shipping: $scope.shipping,
        billing: $scope.billing,
      })
      .then(function (updatedUser) {
        return updatedUser.data;
      })
      .then(function (user) {
        return $http.put("/api/order/");
      })
      .then(function (processedOrder) {
        $scope.order = processedOrder;
      });
  };
});
