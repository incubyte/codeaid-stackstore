app.directive("reviewList", function () {
  return {
    restrict: "E",
    templateUrl: "/js/review/templates/review-list.html",
    scope: {
      theReviews: "=",
    },
  };
});
