describe("ReviewFactory", function () {
  beforeEach(module("FullstackGeneratedApp"));
  beforeEach(module("$$UpgradeModule"));

  var $httpBackend, ReviewFactory;

  beforeEach(inject(function (_$httpBackend_, _ReviewFactory_) {
    $httpBackend = _$httpBackend_;
    ReviewFactory = _ReviewFactory_;
  }));

  describe("getOneDreamReviews", function () {
    it("should make a GET request to /api/dreams/:id/reviews and return the reviews", function () {
      var dreamId = 1;
      var reviewsData = [{ id: 1, text: "Great dream!" }, { id: 2, text: "Awesome dream!" }];

      $httpBackend.expectGET("/api/dreams/" + dreamId + "/reviews").respond(200, reviewsData);

      ReviewFactory.getOneDreamReviews(dreamId).then(function (reviews) {
        expect(reviews).toEqual(reviewsData);
      });

      $httpBackend.flush();
    });
  });

  describe("addReview", function () {
    it("should make a POST request to /api/dreams/:id/reviews with the review data", function () {
      var review = { dreamId: 1, userId: 1, text: "Great dream!" };

      $httpBackend.expectPOST("/api/dreams/" + review.dreamId + "/reviews", review, { user: review.userId }).respond(201);

      ReviewFactory.addReview(review).then(function () {
        expect(console.log).toHaveBeenCalledWith("Thanks for the review");
      });

      $httpBackend.flush();
    });

    it("should log an error message if the POST request fails", function () {
      var review = { dreamId: 1, userId: 1, text: "Great dream!" };

      $httpBackend.expectPOST("/api/dreams/" + review.dreamId + "/reviews", review, { user: review.userId }).respond(500);

      ReviewFactory.addReview(review).catch(function () {
        expect(console.log).toHaveBeenCalledWith("Review error!!!");
      });

      $httpBackend.flush();
    });
  });
});