describe("ReviewFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $controller, $rootScope, $scope, $httpBackend, ReviewFactory;

  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_, _ReviewFactory_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    ReviewFactory = _ReviewFactory_;
  }));

  describe("getOneDreamReviews", function () {
    it("should retrieve reviews for a specific dream", function () {
      var dreamId = 1;
      var mockReviews = [{ id: 1, comment: "Great dream!" }, { id: 2, comment: "Loved it!" }];
      $httpBackend.expectGET("/api/dreams/" + dreamId + "/reviews").respond(mockReviews);

      ReviewFactory.getOneDreamReviews(dreamId).then(function (reviews) {
        expect(reviews).toEqual(mockReviews);
      });

      $httpBackend.flush();
    });
  });

  describe("addReview", function () {
    it("should add a review for a dream", function () {
      var review = { dreamId: 1, userId: 1, comment: "Amazing dream!" };
      $httpBackend.expectPOST("/api/dreams/" + review.dreamId + "/reviews", review, function (headers) {
        return headers.user === review.userId.toString();
      }).respond(201, review);

      ReviewFactory.addReview(review).then(function (response) {
        expect(response.status).toBe(201);
      }).catch(function () {
        fail("The request should not fail.");
      });

      $httpBackend.flush();
    });

    it("should handle errors when adding a review fails", function () {
      var review = { dreamId: 1, userId: 1, comment: "Amazing dream!" };
      $httpBackend.expectPOST("/api/dreams/" + review.dreamId + "/reviews", review).respond(500);

      ReviewFactory.addReview(review).then(function () {
        fail("The request should fail.");
      }).catch(function (error) {
        expect(error.status).toBe(500);
      });

      $httpBackend.flush();
    });
  });
});