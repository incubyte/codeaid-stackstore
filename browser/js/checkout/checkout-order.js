'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/cart/checkout/:id',
        templateUrl: '/js/checkout/checkout-order.html',
        controller: 'CheckoutCtrl',
        resolve: {
            user: function(CheckoutFactory, $stateParams) {
                return CheckoutFactory.getUser($stateParams.id);
            }
        }
    })
})

app.factory('CheckoutFactory', function($http) {
    var CheckoutFactory = {};

    CheckoutFactory.getUser = function(id) {
        return $http.get('/api/users/' + id)
            .then(function(user) {
                return user.data;
            })
    }
    return CheckoutFactory;
});

app.controller('CheckoutCtrl', function($scope, user, $http) {
    $scope.user = user;
    $scope.order;
    $scope.submitOrder = function() {
        console.log("SHIPPING", $scope.shipping, "BILLING", $scope.billing);
        $http.put('/api/users/', { shipping: $scope.shipping, billing: $scope.billing })
            .then(function(updatedUser) {
                return updatedUser.data;
            })
            .then(function(user) {
                return $http.put('/api/order/');
            })
            .then(function(processedOrder) {
                $scope.order = processedOrder;
            });
    };
});
