app.config(function ($stateProvider) {
  $stateProvider.state("reviews", {
    url: "/dreams/:id/reviews",
    controller: "ReviewCtrl",
    templateUrl: "js/review/templates/review.html",
    resolve: {
      reviewListing: function (ReviewFactory, $stateParams) {
        return ReviewFactory.getReviews($stateParams.id);
      },
    },
  });
});
