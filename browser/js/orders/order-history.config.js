app.config(function ($stateProvider) {
  $stateProvider.state("Orders", {
    url: "/orders/history/:id",
    templateUrl: "/js/orders/order-history.html",
    controller: "OrderHistoryCtrl",
    resolve: {
      previousOrders: function (OrderHistoryFactory, $stateParams) {
        return OrderHistoryFactory.viewOrders($stateParams.id);
      },
    },
  });
});
