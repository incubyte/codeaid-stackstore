'use strict';

app.config(function($stateProvider){
	$stateProvider.state('checkout', {
		url: '/cart/checkout/:id',
		templateUrl: '/js/checkout/checkout-order.html',
		controller: 'CheckoutCtrl',
		resolve: {
			user: function(CheckoutFactory, $stateParams){
				return CheckoutFactory.getUser($stateParams.id);
			}
		}
	})
})

app.factory('CheckoutFactory', function($http){
	var CheckoutFactory = {};

	CheckoutFactory.getUser = function(id){
		return $http.get('/api/users/' + id)
		.then(function(user){
			return user.data;
		})
	}
	return CheckoutFactory;
});

app.controller('CheckoutCtrl', function($scope, user){
	$scope.user = user;
	console.log('user', user);
	console.log('CheckoutCtrl');
})

