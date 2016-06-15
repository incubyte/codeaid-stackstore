app.directive('sidebar', function($rootScope, $state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/sidebar/sidebar.html',
        link: function(scope) {

            scope.items = [
                { cat: 'Daydream' },
                { cat: 'Lucid' },
                { cat: 'Signal' },
                { cat: 'Epic' },
                { cat: 'Progressive' },
                { cat: 'Recurring' }
            ];
        }
    };
});
