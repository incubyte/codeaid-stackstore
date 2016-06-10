app.config(function($stateProvider) {
    $stateProvider.state('Cat', {
        url: '/api/dreams/category/:category',
        controller: 'CategoryCtrl',
        templateUrl: 'js/dreams/templates/dream-categories.html',
        resolve: {
            theDreams: function(CategoryFactory, $stateParams) {
                return CategoryFactory.findOne($stateParams.category);
            }
        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/api/dreams',
        controller: 'CategoryCtrl',
        templateUrl: '/server/views/index.html',
        resolve: {
            theCategories: function(CategoryFactory) {
                return CategoryFactory.getCategories();
            }
        }
    });
});

app.factory('CategoryFactory', function($http, DreamsFactory) {
    var CategoryFactory = {};
    CategoryFactory.getCategories = function() {
        return $http.get('/api/dreams/')
            .then(function(response) {
                return response.data;
            })
            .then(function(dreams) {
                var categories = [];
                dreams.forEach(function(dream) {
                    dream.category.forEach(function(cat) {
                        if (!categories.includes(cat)) categories.push(cat);
                    });
                });
                return categories;
            });
    };

    CategoryFactory.findOne = function(category) {
        return $http.get('/api/dreams/category/' + category)
            .then(function(response) {
                var dreams = response.data;
                dreams.forEach(function(dream) {
                    dream.imageUrl = 'https://jlau-bucket-1.s3.amazonaws.com/uploads/topic/image/42/fullstack.png';
                });
                return dreams;
            });
    };
    return CategoryFactory;
});

app.controller('CategoryCtrl', function($scope, theDreams, theCategories) {
    console.log("HELLLLOOO I'M HERE");
    $scope.categories = theCategories;
    $scope.dreams = theDreams;
});
