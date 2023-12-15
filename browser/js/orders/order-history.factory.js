app.factory("OrderHistoryFactory", function ($http) {
  var OrderHistoryFactory = {};

  OrderHistoryFactory.viewOrders = function (id) {
    return $http.get("/api/order/" + id).then(function (response) {
      console.log("VIEW MY ORDERS", response.data);
      return response.data;
    });
  };

  return OrderHistoryFactory;
});
