"use strict";

app.config(function ($stateProvider) {
  $stateProvider.state("checkout", {
    url: "/cart/checkout/:id",
    templateUrl: "/js/checkout/checkout-order.html",
    controller: "CheckoutCtrl",
    resolve: {
      user: function (CheckoutFactory, $stateParams) {
        return CheckoutFactory.getUser($stateParams.id);
      },
    },
  });
});
