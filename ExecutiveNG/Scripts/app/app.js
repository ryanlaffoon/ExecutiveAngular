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
        if (!input) return input;
        if (!search) return input;

        var expected = ('' + search).toLowerCase();
        var result = [];

        angular.forEach(input, function (value) {
            var actual = ('' + value.first).toLowerCase();
            if (actual.indexOf(expected) !== -1) {
                result.push(value);
            }
        });
        return result;

        //var filtered = [];

        //search = search.toLowerCase();

        //angular.forEach(input, function (executive) {
          

        //    if (executive.name.last.toLowerCase().indexOf(search) !== -1)  {
        //        filtered.push(executive);
        //    }else if (executive.name.first.toLowerCase().indexOf(search) !== -1){
        //        filtered.push(executive);
        //    }
        //});
        //return filtered.slice(0, count);
    };
});
