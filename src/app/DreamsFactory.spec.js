describe("DreamsFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, DreamsFactory;

  beforeEach(inject(function (_$httpBackend_, _DreamsFactory_) {
    $httpBackend = _$httpBackend_;
    DreamsFactory = _DreamsFactory_;
  }));

  describe("getAll", function () {
    it("should make a GET request to /api/dreams/ and return the data", function () {
      var responseData = [{ id: 1, name: "Dream 1" }, { id: 2, name: "Dream 2" }];

      $httpBackend.expectGET("/api/dreams/").respond(200, responseData);

      DreamsFactory.getAll().then(function (dreams) {
        expect(dreams).toEqual(responseData);
      });

      $httpBackend.flush();
    });
  });
});