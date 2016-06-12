app.config(function($stateProvider) {
    $stateProvider.state('Cat', {
        url: '/dreams/category/:category',
        controller: 'CategoryCtrl',
        templateUrl: 'js/dreams/templates/dream-categories.html',
        resolve: {
            theDreams: function(CategoryFactory, $stateParams) {
                return CategoryFactory.findOne($stateParams.category);
            }
        }
    });
});

app.factory('CategoryFactory', function($http, DreamsFactory) {
    var CategoryFactory = {};
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

app.controller('CategoryCtrl', function($scope, theDreams) {
    $scope.dreams = theDreams;
});