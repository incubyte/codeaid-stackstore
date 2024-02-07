describe("SecretStash", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, SecretStash;

  beforeEach(inject(function (_$httpBackend_, _SecretStash_) {
    $httpBackend = _$httpBackend_;
    SecretStash = _SecretStash_;
  }));

  describe("getStash", function () {
    it("should make a GET request to /api/members/secret-stash and return the response data", function () {
      var responseData = { secret: "stash" };
      $httpBackend.expectGET("/api/members/secret-stash").respond(200, responseData);

      var promise = SecretStash.getStash();
      $httpBackend.flush();

      promise.then(function (data) {
        expect(data).toEqual(responseData);
      });
    });
  });
});