describe("CategoryCtrl", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, theDreams;

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    theDreams = ["dream1", "dream2", "dream3"];
  }));

  describe("initialization", function () {
    it("should set $scope.dreams to theDreams", function () {
      $controller("CategoryCtrl", { $scope: $scope, theDreams: theDreams });

      expect($scope.dreams).toEqual(theDreams);
    });
  });
});