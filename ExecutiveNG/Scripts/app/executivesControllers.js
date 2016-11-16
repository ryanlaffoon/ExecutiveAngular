var executivesControllers = angular.module('executivesControllers', []);

executivesControllers.controller('executivesListController', ['$scope', '$http', 'Executives', function ($scope, $http, Executives) {
    var executives = [];

    Executives.query(function (executives) {
        angular.forEach(executives, function (executive) {
            executives.push(executive);

            if (localStorage) {
                var savedInfo = localStorage.getItem(executive.id);
                if (savedInfo !== null) {
                    executive.textEn = savedInfo;
                }
            }
        });
        $scope.executives = executives;
    });

    $scope.executivesCount = 76;
}]);

executivesControllers.controller('executiveDetailController', function ($scope, $routeParams) {
    var executives = $scope.$parent.executives;
    for (var index = 0; index < executives.length; index++) {
        if (executives[index].id.govtrack == $routeParams.executiveId) {
            $scope.executive = executives[index];
            break;
        }
    }

    $scope.update = function () {
        if (!localStorage) {
            return;
        }

        localStorage.setItem($scope.executive.id, $scope.executive.textEn);
    };
});