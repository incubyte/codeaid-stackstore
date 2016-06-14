'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart/:id',
        templateUrl: '/js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            theCart: function(CartFactory, $stateParams) {
                return CartFactory.getItems($stateParams.id);
            },
            theUser: function(CartFactory, $stateParams) {
                return CartFactory.getUser($stateParams.id);
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

    CartFactory.getUser = function(id){
        return $http.get('/api/users/' + id)
        .then(function(user){
            return user.data;
        });
    }

    return CartFactory;

});

app.controller('CartCtrl', function($scope, theCart, $http, theUser, CartFactory){

	$scope.cart = theCart.dreams;
	$scope.total = theCart.total;
    $scope.user = theUser;

    $scope.removeItem = function(id, item){
        $http.put('/api/cart/' + id, item)
        .then(function(data){
            CartFactory.getItems()
            .then(function(daCart){
                $scope.cart = daCart.dreams;
                $scope.total = daCart.total;
            })
        })
    }
});