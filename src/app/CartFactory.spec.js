describe("CartFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, CartFactory;

  beforeEach(inject(function (_$httpBackend_, _CartFactory_) {
    $httpBackend = _$httpBackend_;
    CartFactory = _CartFactory_;
  }));

  describe("getItems", function () {
    it("should make a GET request to /api/cart/ and return the response data", function () {
      var mockResponse = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }];

      $httpBackend.expectGET("/api/cart/").respond(200, mockResponse);

      CartFactory.getItems().then(function (data) {
        expect(data).toEqual(mockResponse);
      });

      $httpBackend.flush();
    });
  });
});