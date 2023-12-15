app.factory("ReviewFactory", function ($http) {
  var ReviewFactory = {};

  ReviewFactory.getOneDreamReviews = function (dreamId) {
    var id = +dreamId;

    return $http.get("/api/dreams/" + id + "/reviews").then(function (reviews) {
      console.log("Here is the reviews for ya", reviews.data);
      return reviews.data;
    });
  };

  ReviewFactory.addReview = function (review) {
    var id = +review.dreamId;

    return $http
      .post("/api/dreams/" + id + "/reviews", review, { user: review.userId })
      .then(function (newReview) {
        console.log("Thanks for the review");
      })
      .catch(function () {
        console.log("Review error!!!");
      });
  };

  return ReviewFactory;
});
