"use strict";

app.config(function ($stateProvider) {
  $stateProvider.state("cart", {
    url: "/cart",
    templateUrl: "/js/cart/cart.html",
    controller: "CartCtrl",
    resolve: {
      theCart: function (CartFactory, $stateParams) {
        return CartFactory.getItems($stateParams.id);
      },
    },
  });
});
