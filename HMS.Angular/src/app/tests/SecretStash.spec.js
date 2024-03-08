describe("SecretStash Service", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var SecretStash, $httpBackend;

  beforeEach(inject(function (_SecretStash_, _$httpBackend_) {
    SecretStash = _SecretStash_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("getStash", function () {
    it("should make an HTTP GET request to the correct URL", function () {
      var testResponse = { data: "some secret data" };
      $httpBackend.expectGET("/api/members/secret-stash").respond(testResponse);

      var stash;
      SecretStash.getStash().then(function (data) {
        stash = data;
      });

      $httpBackend.flush();

      expect(stash).toEqual(testResponse.data);
    });
  });
});