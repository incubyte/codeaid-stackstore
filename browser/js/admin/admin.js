'use strict'

app.factory('AdminFactory', function($http) {

    var AdminFactory = {};

    //admin view all dreams
    AdminFactory.fetchDreams = function() {
        return $http.get('/api/dreams')
            .then(function(dreams) {
                // console.log("i'm the dreams", dreams.data)
                return dreams.data
            })
    };

    //admin create dream
    AdminFactory.createDream = function(data) {
        return $http.post('/api/dreams/', data)
            .then(function(createdDream) {
                return createdDream.data
            })
    }

    //admin update one dream
    AdminFactory.updateDream = function(id, data) {
        return $http.put('/api/dreams/' + id, data)
            .then(function(dream) {
                console.log(dream.data)
                return dream.data
            })
    }

    //admin delete one dream
    AdminFactory.deleteDream = function(id) {
        return $http.delete('/api/dreams/' + id)
            .then(function(response) {
                return response.data
            })
    }

    //admin view all users
    AdminFactory.fetchUsers = function() {
        return $http.get('/api/users')
            .then(function(users) {
                return users;
            })
    }

    //admin create user
    AdminFactory.createUser = function(data) {
        return $http.post('/api/users', data)
            .then(function(createdUser) {
                return createdUser.data
            })
    }

    //admin update one user
    AdminFactory.updateUser = function(id, data) {
        return $http.put('/api/users/' + id, data)
            .then(function(user) {
                return user.data;
            })
    }

    //admin delete one user
    AdminFactory.deleteUser = function(id) {
        return $http.delete('/api/users/' + id)
            .then(function(response) {
                return response.data
            })
    }

    //admin view list of all orders
    AdminFactory.fetchOrders = function() {
        return $http.get('/api/orders')
            .then(function(response) {
                return response.data;
            })
            .then(function(orders) {
                return orders.data
            })
    };

    //admin edit one order
    AdminFactory.fetchOrder = function(id, data) {
        return $http.get('/api/orders' + id, data)
            .then(function(order) {
                return order.data
            })
    }

    //admin delete one order
    AdminFactory.deleteOrder = function(id) {
        return $http.delete('/api/orders' + id)
            .then(function(response) {
                return response.data
            })
    }

    return AdminFactory;
})

app.config(function($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl',
        templateUrl: 'js/admin/templates/admin-main.html'
    });

    $stateProvider.state('admin-users', {
        url: '/admin/users',
        controller: 'AdminCtrl',
        templateUrl: 'js/admin/templates/admin-users.html',
        resolve: {
            allUsers: function(AdminFactory) {
                return AdminFactory.fetchUsers()
            },
        }
    });

    $stateProvider.state('admin-dreams', {
        url: '/admin/dreams',
        controller: 'AdminCtrl',
        templateUrl: 'js/admin/templates/admin-dreams.html',
        resolve: {
            allDreams: function(AdminFactory) {
                return AdminFactory.fetchDreams()
            },
        }
    });

    $stateProvider.state('admin-orders', {
        url: '/admin/orders',
        controller: 'AdminCtrl',
        templateUrl: 'js/admin/templates/admin-orders.html',
        resolve: {
            allOrders: function(AdminFactory) {
                return AdminFactory.fetchOrders()
            }
        }
    });

});

app.controller('AdminCtrl', function($scope, AdminFactory) {

    $scope.orders = []
    $scope.dreams = []
    $scope.users = []
    $scope.createdDream;
    $scope.createUser;

    AdminFactory.fetchDreams()
        .then(function(dreams) {
            $scope.dreams = dreams
        })

    AdminFactory.fetchOrders()
        .then(function(orders) {
            $scope.orders = orders
        })

    AdminFactory.fetchUsers()
        .then(function(users) {
            $scope.users = users
        })

    $scope.createdDream = function(dreamData) {
        AdminFactory.createDream(dreamData);
    }

    $scope.updateDream = function(newDream, oldDream) {
        if (!newDream.title) {
            newDream.title = oldDream.title;
        }
        if (!newDream.description) {
            newDream.description = oldDream.description;
        }
        if (!newDream.category) {
            newDream.category = oldDream.category;
        }
        if (!newDream.price) {
            newDream.price = oldDream.price;
        }
        if (!newDream.photo) {
            newDream.photo = oldDream.photo;
        }
        if (!newDream.quantity) {
            newDream.quantity = oldDream.quantity;
        }
        AdminFactory.updateDream(oldDream.id, newDream);
    }
})
