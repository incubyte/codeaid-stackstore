describe("OrderHistoryFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, OrderHistoryFactory;

  beforeEach(inject(function (_$httpBackend_, _OrderHistoryFactory_) {
    $httpBackend = _$httpBackend_;
    OrderHistoryFactory = _OrderHistoryFactory_;
  }));

  describe("viewOrders", function () {
    it("should make a GET request to /api/order/<id>", function () {
      var id = 123;
      $httpBackend.expectGET("/api/order/" + id).respond(200, { data: "order data" });

      OrderHistoryFactory.viewOrders(id).then(function (response) {
        expect(response.data).toEqual("order data");
      });

      $httpBackend.flush();
    });
  });
});