app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'DreamsCtrl',
        templateUrl: 'js/home/home.html'
    });
});

app.factory('DreamsFactory', function($http) {
    var DreamsFactory = {};
    DreamsFactory.getAll = function() {
        return $http.get('/api/dreams')
            .then(function(dreams) {
                return dreams.data;
            });
    };
    DreamsFactory.getUniqueCategories = function(){
        return $http.get('api/dreams')
        .then(function(dreams){
            return dreams.data;
        })
        .then(function(dreams){
            var categories = [];
            dreams.forEach(function(dream){
                dream.category.forEach(function(cat){
                    if (!categories.includes(cat)) categories.push(cat);
                 });
            });
            return categories;
        });
    };

    return DreamsFactory;

});

app.controller('DreamsCtrl', function($scope, DreamsFactory) {
    $scope.dreams;
    
    DreamsFactory.getAll().then(function(dreams) {
        dreams.forEach(function(dream){
            dream.imageUrl = '/images/' + dream.photo + '.jpg';
        });
        $scope.dreams = dreams;
    });
   DreamsFactory.getUniqueCategories()
   .then(function(categories){
        $scope.categories = categories;
   });
    
});