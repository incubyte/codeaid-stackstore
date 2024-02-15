describe("AdminFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, AdminFactory;

  beforeEach(inject(function (_$httpBackend_, _AdminFactory_) {
    $httpBackend = _$httpBackend_;
    AdminFactory = _AdminFactory_;
  }));

  describe("fetchDreams", function () {
    it("should make a GET request to /api/dreams and return the dreams data", function () {
      var dreamsData = [{ id: 1, name: "Dream 1" }, { id: 2, name: "Dream 2" }];

      $httpBackend.expectGET("/api/dreams").respond(200, dreamsData);

      AdminFactory.fetchDreams().then(function (result) {
        expect(result).toEqual(dreamsData);
      });

      $httpBackend.flush();
    });
  });

  describe("fetchOneDream", function () {
    it("should make a GET request to /api/dreams/:id and return the dream data", function () {
      var dreamId = 1;
      var dreamData = { id: 1, name: "Dream 1" };

      $httpBackend.expectGET("/api/dreams/" + dreamId).respond(200, dreamData);

      AdminFactory.fetchOneDream(dreamId).then(function (result) {
        expect(result).toEqual(dreamData);
      });

      $httpBackend.flush();
    });
  });

  describe("createDream", function () {
    it("should make a POST request to /api/dreams/ with the provided data and return the created dream data", function () {
      var dreamData = { name: "New Dream" };

      $httpBackend.expectPOST("/api/dreams/", dreamData).respond(201, dreamData);

      AdminFactory.createDream(dreamData).then(function (result) {
        expect(result).toEqual(dreamData);
      });

      $httpBackend.flush();
    });
  });

  describe("updateDream", function () {
    it("should make a PUT request to /api/dreams/:id with the provided data and return the updated dream data", function () {
      var dreamId = 1;
      var dreamData = { name: "Updated Dream" };

      $httpBackend.expectPUT("/api/dreams/" + dreamId, dreamData).respond(200, dreamData);

      AdminFactory.updateDream(dreamId, dreamData).then(function (result) {
        expect(result).toEqual(dreamData);
      });

      $httpBackend.flush();
    });
  });

  describe("deleteDream", function () {
    it("should make a DELETE request to /api/dreams/:id and return the response data", function () {
      var dreamId = 1;

      $httpBackend.expectDELETE("/api/dreams/" + dreamId).respond(200, {});

      AdminFactory.deleteDream(dreamId).then(function (result) {
        expect(result).toEqual({});
      });

      $httpBackend.flush();
    });
  });

  describe("fetchUsers", function () {
    it("should make a GET request to /api/users and return the users data", function () {
      var usersData = [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }];

      $httpBackend.expectGET("/api/users").respond(200, usersData);

      AdminFactory.fetchUsers().then(function (result) {
        expect(result).toEqual(usersData);
      });

      $httpBackend.flush();
    });
  });

  describe("createUser", function () {
    it("should make a POST request to /api/users with the provided data and return the created user data", function () {
      var userData = { name: "New User" };

      $httpBackend.expectPOST("/api/users", userData).respond(201, userData);

      AdminFactory.createUser(userData).then(function (result) {
        expect(result).toEqual(userData);
      });

      $httpBackend.flush();
    });
  });

  describe("updateUser", function () {
    it("should make a PUT request to /api/users/:id with the provided data and return the updated user data", function () {
      var userId = 1;
      var userData = { name: "Updated User" };

      $httpBackend.expectPUT("/api/users/" + userId, userData).respond(200, userData);

      AdminFactory.updateUser(userId, userData).then(function (result) {
        expect(result).toEqual(userData);
      });

      $httpBackend.flush();
    });
  });

  describe("deleteUser", function () {
    it("should make a DELETE request to /api/users/:id and return the response data", function () {
      var userId = 1;

      $httpBackend.expectDELETE("/api/users/" + userId).respond(200, {});

      AdminFactory.deleteUser(userId).then(function (result) {
        expect(result).toEqual({});
      });

      $httpBackend.flush();
    });
  });

  describe("fetchOrders", function () {
    it("should make a GET request to /api/orders and return the orders data", function () {
      var ordersData = [{ id: 1, name: "Order 1" }, { id: 2, name: "Order 2" }];

      $httpBackend.expectGET("/api/orders").respond(200, ordersData);

      AdminFactory.fetchOrders().then(function (result) {
        expect(result).toEqual(ordersData);
      });

      $httpBackend.flush();
    });
  });

  describe("fetchOrder", function () {
    it("should make a GET request to /api/orders/:id with the provided data and return the order data", function () {
      var orderId = 1;
      var orderData = { id: 1, name: "Order 1" };

      $httpBackend.expectGET("/api/orders/" + orderId).respond(200, orderData);

      AdminFactory.fetchOrder(orderId).then(function (result) {
        expect(result).toEqual(orderData);
      });

      $httpBackend.flush();
    });
  });

  describe("deleteOrder", function () {
    it("should make a DELETE request to /api/orders/:id and return the response data", function () {
      var orderId = 1;

      $httpBackend.expectDELETE("/api/orders/" + orderId).respond(200, {});

      AdminFactory.deleteOrder(orderId).then(function (result) {
        expect(result).toEqual({});
      });

      $httpBackend.flush();
    });
  });
});