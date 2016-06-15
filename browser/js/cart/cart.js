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
                return response.data;
            });
    }

    return CartFactory;

});

app.controller('CartCtrl', function($scope, theCart, $http, CartFactory){

	$scope.cart = theCart.dreams;
	$scope.total = theCart.total;

    $scope.increase = function(dream){
        console.log("DREAM", dream);
        return $http.put('/api/cart/inc/', dream)
        .then(function(response){
            CartFactory.getItems()
            .then(function(cart){
                $scope.cart = cart.dreams;
                $scope.total = cart.total;
            });
        });
    }

    $scope.decrease = function(dream){
        console.log("DREAM", dream);
        return $http.put('/api/cart/dec/', dream)
        .then(function(response){
            CartFactory.getItems()
            .then(function(cart){
                $scope.cart = cart.dreams;
                $scope.total = cart.total;
            });
        });

    }

    $scope.removeItem = function(item){
        $http.put('/api/cart/', item)
        .then(function(data){
            CartFactory.getItems()
            .then(function(daCart){
                $scope.cart = daCart.dreams;
                $scope.total = daCart.total;
            })
        })
    }
});