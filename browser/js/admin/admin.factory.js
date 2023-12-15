"use strict";

app.factory("AdminFactory", function ($http) {
  var AdminFactory = {};

  //admin view all dreams
  AdminFactory.fetchDreams = function () {
    return $http.get("/api/dreams").then(function (dreams) {
      // console.log("i'm the dreams", dreams.data)
      return dreams.data;
    });
  };

  AdminFactory.fetchOneDream = function (id) {
    return $http.get("/api/dreams/" + id).then(function (dream) {
      return dream.data;
    });
  };

  //admin create dream
  AdminFactory.createDream = function (data) {
    console.log("DATA", data);
    return $http.post("/api/dreams/", data).then(function (dream) {
      console.log("I'm in the factory", dream);
      return dream.data;
    });
  };

  //admin update one dream
  AdminFactory.updateDream = function (dreamId, data) {
    return $http.put("/api/dreams/" + dreamId, data).then(function (dream) {
      return dream.data;
    });
  };

  //admin delete one dream
  AdminFactory.deleteDream = function (id) {
    return $http.delete("/api/dreams/" + id).then(function (response) {
      return response.data;
    });
  };

  //admin view all users
  AdminFactory.fetchUsers = function () {
    return $http.get("/api/users").then(function (users) {
      return users;
    });
  };

  //admin create user
  AdminFactory.createUser = function (data) {
    return $http.post("/api/users", data).then(function (createdUser) {
      return createdUser.data;
    });
  };

  //admin update one user
  AdminFactory.updateUser = function (id, data) {
    return $http.put("/api/users/" + id, data).then(function (user) {
      return user.data;
    });
  };

  //admin delete one user
  AdminFactory.deleteUser = function (id) {
    return $http.delete("/api/users/" + id).then(function (response) {
      return response.data;
    });
  };

  //admin view list of all orders
  AdminFactory.fetchOrders = function () {
    return $http
      .get("/api/orders")
      .then(function (response) {
        return response.data;
      })
      .then(function (orders) {
        return orders.data;
      });
  };

  //admin edit one order
  AdminFactory.fetchOrder = function (id, data) {
    return $http.get("/api/orders/" + id, data).then(function (order) {
      return order.data;
    });
  };

  //admin delete one order
  AdminFactory.deleteOrder = function (id) {
    return $http.delete("/api/orders/" + id).then(function (response) {
      return response.data;
    });
  };

  return AdminFactory;
});
