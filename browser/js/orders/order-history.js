app.config(function($stateProvider) {
    $stateProvider.state('Orders', {
        url: '/orders/history/:id',
        templateUrl: '/js/orders/order-history.html',
        controller: 'OrderHistoryCtrl',
        resolve: {
            previousOrders: function(OrderHistoryFactory, $stateParams) {
                return OrderHistoryFactory.viewOrders($stateParams.id);
            }
        }
    })
})

app.factory('OrderHistoryFactory', function($http) {
    var OrderHistoryFactory = {};

    OrderHistoryFactory.viewOrders = function(id) {
        return $http.get('/api/order/' + id)
            .then(function(response) {
            	console.log("VIEW MY ORDERS", response.data);
                return response.data;
            });
    };

    return OrderHistoryFactory;
});

app.controller('OrderHistoryCtrl', function($scope, previousOrders){
	$scope.orders = previousOrders;
});