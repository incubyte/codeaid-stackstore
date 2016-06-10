app.config(function($stateProvider){
	$stateProvider.state('cart', {
		url: '/api/cart/:id',
		templateUrl: '/js/cart/cart.html',
		controller: 'CartCtrl'
	});
});

// app.factory('CartFactory', function($http){
// 	var CartFactory = {};
// 	CartFactory.getCart = function(id){
// 		return $http.get('/api/cart/' + id)
// 		.then(function())
// 	}
// });

// app.controller('CartCtrl', function($scope){

// })