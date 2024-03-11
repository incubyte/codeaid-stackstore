describe("OrderHistoryFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $httpBackend, OrderHistoryFactory;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _OrderHistoryFactory_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    OrderHistoryFactory = _OrderHistoryFactory_;
  }));

  describe("viewOrders", function () {
    it("should fetch order history for a given id", function () {
      var testId = 123;
      var mockResponse = { data: "mock order data" };
      $httpBackend.expectGET("/api/order/" + testId).respond(mockResponse);

      var orderHistory;
      OrderHistoryFactory.viewOrders(testId).then(function (data) {
        orderHistory = data;
      });

      $httpBackend.flush();

      expect(orderHistory).toEqual(mockResponse.data);
    });
  });
});