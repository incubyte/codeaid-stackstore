app.directive('sidebar', function($rootScope, $state) {
	return {
		restrict: 'E',
		scope: {},
		templateURL: 'js/common/directives/sidebar/sidebar.html',
		link: function(scope) {

			scope.items = [
				{label: 'Daydream', state: 'Cat'},
				{label: 'Lucid', state: 'Cat'},
				{label: 'Signal', state: 'Cat'},
				{label: 'Epic', state: 'Cat'},
				{label: 'Progressive', state: 'Cat'},
				{label: 'Recurring', state: 'Cat'}
			]
		}
	}
})