describe("AboutController", function () {
  beforeEach(module("FullstackGeneratedApp"));

  var $controller, $rootScope, FullstackPics, $scope;

  beforeEach(inject(function (_$controller_, _$rootScope_, _FullstackPics_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    FullstackPics = _FullstackPics_;
    $scope = $rootScope.$new();
  }));

  describe("initialization", function () {
    it("should shuffle images from FullstackPics", function () {
      sinon.stub(_, "shuffle").returns(["image1", "image2", "image3"]);
      $controller("AboutController", {
        $scope: $scope,
        FullstackPics: FullstackPics,
      });
      expect($scope.images).to.deep.equal(["image1", "image2", "image3"]);
      _.shuffle.restore();
    });
  });
});
