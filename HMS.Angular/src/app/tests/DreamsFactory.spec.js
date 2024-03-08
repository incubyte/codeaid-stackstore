describe("DreamsFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $httpBackend, DreamsFactory;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _DreamsFactory_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    DreamsFactory = _DreamsFactory_;
  }));

  describe("initialization", function () {
    it("should have a getAll function", function () {
      expect(typeof DreamsFactory.getAll).toBe("function");
    });
  });

  describe("getAll", function () {
    it("should make an HTTP GET request to '/api/dreams/'", function () {
      var mockDreamsData = [{ id: 1, name: "Flying" }, { id: 2, name: "Falling" }];
      $httpBackend.expectGET("/api/dreams/").respond(mockDreamsData);

      var dreams;
      DreamsFactory.getAll().then(function (data) {
        dreams = data;
      });

      $httpBackend.flush();

      expect(dreams).toEqual(mockDreamsData);
    });
  });
});