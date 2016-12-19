var executivesControllers = angular.module('executivesControllers', []);

executivesControllers.controller('executivesListController', ['$scope', '$filter', '$http', 'Executives', function ($scope, $filter, $http, Executives) {
    var executives = [];

    Executives.query(function (executives) {
        angular.forEach(executives, function (executive) {



            executives.push(executive);

            //if (localStorage) {
            //    var savedInfo = localStorage.getItem(executive.id);
            //    if (savedInfo !== null) {
            //        executive.textEn = savedInfo;
            //    }
            //}
        });
        $scope.executives = executives;

        $scope.presidents = $filter('filter')($scope.executives, { terms: { type: 'prez' } }, true);

        $scope.vicepresidents = $filter('filter')($scope.executives, { terms: { type: 'viceprez' } }, true);

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
    });
}]);

executivesControllers.controller('executiveDetailController', function ($scope, $routeParams) {
    var executives = $scope.$parent.executives;
    for (var index = 0; index < executives.length; index++) {
        if (executives[index].id.govtrack == $routeParams.executiveId) {
            $scope.executive = executives[index];
            break;
        }
    }

    //$scope.update = function () {
    //    if (!localStorage) {
    //        return;
    //    }

    //    localStorage.setItem($scope.executive.id, $scope.executive.textEn);
    //};
});