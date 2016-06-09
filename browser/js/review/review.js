app.config(function($stateProvider){
	$stateProvider.state('reviews', {
		url: '/api/dreams/:id/reviews',
		controller: 'ReviewCtrl',
		templateUrl: 'js/review/review.html',
		resolve: {
			reviewListing: function(ReviewFactory, $stateParams){
				return ReviewFactory.getReviews($stateParams.id);
			}
		}
	});
});

app.factory('ReviewFactory', function($http) {
	var ReviewFactory = {};

	ReviewFactory.getReviews = function(id) {
		var id = +id

		return $http.get('/api/dreams/' + id + '/reviews')
		.then(function(reviews) {
			return reviews.data
		})
	}

	return ReviewFactory;
})

app.controller('ReviewCtrl', function($scope, ReviewFactory) {

	$scope.reviews = reviewListing;

})