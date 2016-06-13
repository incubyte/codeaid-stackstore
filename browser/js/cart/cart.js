'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/api/cart/:id',
        templateUrl: '/js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            theCart: function(CartFactory, $stateParams) {
                return CartFactory.getItems($stateParams.id);
            }
        }
    });
});

app.factory('CartFactory', function($http) {
    var CartFactory = {};
    CartFactory.getItems = function(id) {
        return $http.get('/api/cart/' + id)
            .then(function(items) {
            	console.log(items.data);
                return items.data;
            });
    }
    return CartFactory;
});

app.controller('CartCtrl', function($scope, theCart){
	console.log("HELLLLLOOOOO CARRTTT");
	console.log(theCart.dreams)
	$scope.cart = theCart.dreams;
	$scope.total = theCart.total;
});
