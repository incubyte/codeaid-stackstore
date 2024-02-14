describe("CategoryFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, CategoryFactory;

  beforeEach(inject(function (_$httpBackend_, _CategoryFactory_) {
    $httpBackend = _$httpBackend_;
    CategoryFactory = _CategoryFactory_;
  }));

  describe("findOne", function () {
    it("should make a GET request to /api/dreams/category/<category>", function () {
      var category = "testCategory";
      var response = { data: "testData" };

      $httpBackend.expectGET("/api/dreams/category/" + category).respond(200, response);

      CategoryFactory.findOne(category).then(function (result) {
        expect(result).toEqual(response.data);
      });

      $httpBackend.flush();
    });
  });
});