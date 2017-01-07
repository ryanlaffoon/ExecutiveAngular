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

mainApp.filter('searchFilter', function () {
    return function (input, search) {
        var result = [];
        if (!search) return input;
        var expected = ('' + search).toLowerCase();
        angular.forEach(input, function (executive) {
            var actual = ('' + executive.name.first + executive.name.last).toLowerCase();
            if (actual.indexOf(expected) !== -1) {
                result.push(executive);
            }
        });
        return result;
    };
});

mainApp.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

mainApp.filter('prez', function () {
    return function (input) {
        return (!!input) ? input == 'prez' ? 'President' : 'Vice President' : '';
    }
});