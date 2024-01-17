describe("ProductFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, ProductFactory;

  beforeEach(inject(function (_$httpBackend_, _ProductFactory_) {
    $httpBackend = _$httpBackend_;
    ProductFactory = _ProductFactory_;
  }));

  describe("getDream", function () {
    it("should make a GET request to /api/dreams/<id>", function () {
      var id = 1;
      $httpBackend.expectGET("/api/dreams/" + id).respond(200, { id: id, name: "Dream" });

      ProductFactory.getDream(id).then(function (response) {
        expect(response).toEqual({ id: id, name: "Dream" });
      });

      $httpBackend.flush();
    });
  });

  describe("getAllDreams", function () {
    it("should make a GET request to /api/dreams", function () {
      $httpBackend.expectGET("/api/dreams").respond(200, [{ id: 1, name: "Dream 1" }, { id: 2, name: "Dream 2" }]);

      ProductFactory.getAllDreams().then(function (response) {
        expect(response).toEqual([{ id: 1, name: "Dream 1" }, { id: 2, name: "Dream 2" }]);
      });

      $httpBackend.flush();
    });
  });
});