var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate', 'executivesControllers', 'executivesServices']);

mainApp.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/executives', {
                templateUrl: 'list.html',
                controller: 'executivesListController'
            }).
            when('/executives/:executiveId', {
                templateUrl: 'detail.html',
                controller: 'executiveDetailController'
            }).
            otherwise({
                redirectTo: '/executives'
            });
    }
]);

mainApp.filter('filterAndReduce', function () {
    return function (executives, count, query) {
        if (!query) {
            return executives.slice(0, count);
        }

        var filtered = [];

        query = query.toLowerCase();

        angular.forEach(executives, function (executive) {
          

            if (executive.name.last.toLowerCase().indexOf(query) !== -1)  {
                filtered.push(executive);
            }else if (executive.name.first.toLowerCase().indexOf(query) !== -1){
                filtered.push(executive);
            }
        });
        return filtered.slice(0, count);
    };
});
