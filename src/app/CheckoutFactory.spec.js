describe("CheckoutFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, CheckoutFactory;

  beforeEach(inject(function (_$httpBackend_, _CheckoutFactory_) {
    $httpBackend = _$httpBackend_;
    CheckoutFactory = _CheckoutFactory_;
  }));

  describe("getUser", function () {
    it("should make a GET request to /api/users/:id and return the user data", function () {
      var id = 1;
      var userData = { id: 1, name: "John Doe" };

      $httpBackend.expectGET("/api/users/" + id).respond(200, userData);

      CheckoutFactory.getUser(id).then(function (user) {
        expect(user).toEqual(userData);
      });

      $httpBackend.flush();
    });
  });
});