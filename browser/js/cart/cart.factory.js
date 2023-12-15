"use strict";

app.factory("CartFactory", function ($http) {
  var CartFactory = {};

  CartFactory.getItems = function (id) {
    return $http.get("/api/cart/").then(function (response) {
      return response.data;
    });
  };

  return CartFactory;
});
