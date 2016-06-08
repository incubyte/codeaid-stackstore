// app.config(function ($stateProvider) {
//     $stateProvider.state('docs', {
//         url: '/docs',
//         templateUrl: 'js/docs/docs.html'
//     });
// });

app.config(function($stateProvider){
    $stateProvider.state('Cat', {
        url: '/:category',
        controller: 'CategoryCtrl',
        templateUrl: 'js/docs/docs.html',
        resolve: {
        	theDreams: function(CategoryFactory, $stateParams){
        		console.log($stateParams.category);
        		return CategoryFactory.findOne($stateParams.category);
        	}
        }
    })
});


app.factory('CategoryFactory', function($http, DreamsFactory){
	var CategoryFactory = {};
	CategoryFactory.findOne = function(category){
		return $http.get('api/dreams/category/' + category)
		.then(function(response){
			return response.data;
		});
	};
	return CategoryFactory;
});

app.controller('CategoryCtrl', function($scope, theDreams){
	$scope.dreams = theDreams;
});



