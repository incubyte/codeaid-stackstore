```javascript
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
    it("should fetch order data for a given id", function () {
      var testId = 123;
      var mockResponse = { order: 'details' };
      $httpBackend.expectGET("/api/order/" + testId).respond(mockResponse);

      var result;
      OrderHistoryFactory.viewOrders(testId).then(function (data) {
        result = data;
      });

      $httpBackend.flush();

      expect(result).toEqual(mockResponse);
    });
  });
});
```