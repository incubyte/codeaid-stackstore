'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
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
        return $http.get('/api/cart/')
            .then(function(response) {
                console.log("ITEMS IN CART", response.data);
                return response.data;
            });
    }

    return CartFactory;

});

app.controller('CartCtrl', function($scope, theCart, $http, CartFactory){

	$scope.cart = theCart.dreams;
	$scope.total = theCart.total;

    $scope.removeItem = function(id, item){
        $http.delete('/api/cart/', item)
        .then(function(data){
            CartFactory.getItems()
            .then(function(daCart){
                $scope.cart = daCart.dreams;
                $scope.total = daCart.total;
            })
        })
    }
});