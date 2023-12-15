"use strict";

app.controller("AdminCtrl", function ($scope, AdminFactory, $window) {
  $scope.orders;
  $scope.dreams;
  $scope.createdDream;
  $scope.createUser;

  AdminFactory.fetchDreams().then(function (dreams) {
    $scope.dreams = dreams;
  });

  AdminFactory.fetchOrders().then(function (orders) {
    $scope.orders = orders;
  });

  AdminFactory.fetchUsers().then(function (users) {
    $scope.users = users;
  });

  $scope.createdDream = function (data) {
    console.log("I'm in the controller, ", data);
    $scope.dream = {};
    AdminFactory.createDream(data);
  };

  $scope.updateDream = function (dreamId, newDream) {
    var oldDream = AdminFactory.fetchOneDream(dreamId).then(function (dream) {
      $scope.dream = dream;
    });

    if (!newDream.title) {
      newDream.title = oldDream.title;
    }
    if (!newDream.description) {
      newDream.description = oldDream.description;
    }
    if (!newDream.category) {
      newDream.category = oldDream.category;
    }
    if (!newDream.price) {
      newDream.price = oldDream.price;
    }
    if (!newDream.photo) {
      newDream.photo = oldDream.photo;
    }
    if (!newDream.quantity) {
      newDream.quantity = oldDream.quantity;
    }
    AdminFactory.updateDream(dreamId, newDream);
    $window.location.reload();
  };

  $scope.deleteDream = function (dream) {
    AdminFactory.deleteDream(dream.id).then(function () {
      $window.location.reload();
    });
  };
});
