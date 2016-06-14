'use strict';

app.factory('AdminFactory', function($http, $q) {

    var AdminFactory = {};

    function getData(res) {
        return res.data;
    }

    //
    // AdminFactory.fetchById = function(id) {
    //     var url = '/api/users/' + id;
    //     return $q.all([$http.get(url), $http.get(url + '/orders')])
    //         .then(function(responses) {
    //             return responses.map(getData);
    //         })
    //         .then(function(results) {
    //             console.log(results)
    //             var admin = results[0];
    //             var orders = results[1];
    //             admin.orders = orders;
    //             return admin;
    //         })
    // };

    //admin view list of all orders
    AdminFactory.fetchOrders = function() {
        return $http.get('/api/orders')
            .then(getData)
            .then(function(orders) {
                return orders;
            })
    };

    //admin view all dreams
    AdminFactory.fetchDreams = function() {
        return $http.get('/api/dreams')
            .then(getData)
            .then(function(dreams) {
                return dreams;
            })
    };

    //admin view all users
    AdminFactory.fetchUsers = function() {
        return $http.get('/api/users')
            .then(getData)
            .then(function(users) {
                return users;
            })
    };

    //admin delete one user
    AdminFactory.deleteUser = function(id) {
        return $http.delete('/api/users/' + id);
    }

    //admin update one user
    AdminFactory.updateUser = function(id, data) {
        return $http.put('/api/users/' + id, data)
            .then(function(status) {
                // console.log("I'm the status", status);
                return status;
            })
    }

    return AdminFactory;

})

app.controller('adminCtrl', function($scope, allOrders, allProducts, allUsers, AdminFactory) {

    $scope.orders = allOrders;
    $scope.products = allProducts;
    $scope.users = allUsers;

    console.log($scope.orders)

    $scope.sortType = 'id';
    $scope.sortReverse = false;

    $scope.toggleStatus = function(user) {
        AdminFactory.updateUser(user.id, { isAdmin: !user.isAdmin });

        $scope.users = $scope.users.map(function(elem) {
            if (elem.id === user.id) {
                elem.isAdmin = !elem.isAdmin;
            }
            return elem;
        })
    }

    $scope.deleteUser = function(user, index) {
        var userId = user.id;
        $scope.users.splice(index, 1);
        AdminFactory.deleteUser(userId);
    };
})
