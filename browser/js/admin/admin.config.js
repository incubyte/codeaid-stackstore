"use strict";

app.config(function ($stateProvider) {
  $stateProvider.state("admin", {
    url: "/admin",
    controller: "AdminCtrl",
    templateUrl: "js/admin/templates/admin-main.html",
  });

  $stateProvider.state("admin-users", {
    url: "/admin/users",
    controller: "AdminCtrl",
    templateUrl: "js/admin/templates/admin-users.html",
    resolve: {
      allUsers: function (AdminFactory) {
        return AdminFactory.fetchUsers();
      },
    },
  });

  $stateProvider.state("admin-dreams", {
    url: "/admin/dreams",
    controller: "AdminCtrl",
    templateUrl: "js/admin/templates/admin-dreams.html",
    resolve: {
      allDreams: function (AdminFactory) {
        return AdminFactory.fetchDreams();
      },
    },
  });

  $stateProvider.state("admin-orders", {
    url: "/admin/orders",
    controller: "AdminCtrl",
    templateUrl: "js/admin/templates/admin-orders.html",
    resolve: {
      allOrders: function (AdminFactory) {
        return AdminFactory.fetchOrders();
      },
    },
  });
});
