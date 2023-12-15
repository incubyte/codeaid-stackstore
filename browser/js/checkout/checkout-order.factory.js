"use strict";

app.factory("CheckoutFactory", function ($http) {
  var CheckoutFactory = {};

  CheckoutFactory.getUser = function (id) {
    return $http.get("/api/users/" + id).then(function (user) {
      return user.data;
    });
  };
  return CheckoutFactory;
});
