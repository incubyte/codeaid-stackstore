'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart/:id',
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
            .then(function(response) {
            	console.log("ITEMS IN CART", response.data);
                return response.data;
            });
    }
    return CartFactory;
});

app.controller('CartCtrl', function($scope, theCart){
	$scope.cart = theCart.dreams;
	$scope.total = theCart.total;
});
