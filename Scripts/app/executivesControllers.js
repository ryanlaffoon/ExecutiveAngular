var executivesControllers = angular.module('executivesControllers', []);

executivesControllers.controller('executivesListController', ['$scope', '$filter', '$http', '$location', 'Executives', function ($scope, $filter, $http, $location, Executives) {
    var executives,
        filtered,
        presidents,
        vicepresidents,
        filteredTerms,
        homeurl;

    executives = [];
    filtered = [];
    filteredTerms = [];

    Executives.query(function (executives) {
        $scope.executives = executives;
        homeurl = $location.path();
        $scope.homeurl = homeurl;
        // Break-down by executive/term
        angular.forEach(executives, function (executive) {
            executive.image = "img/" + executive.id.govtrack + ".jpg";


            angular.forEach(executive.terms, function (term) {
                var filteredItem = {
                    id: executive.id,
                    name: executive.name,
                    bio: executive.bio,
                    image: executive.image,
                    term: {
                        type: term.type,
                        start: term.start,
                        end: term.end,
                        party: term.party,
                        how: term.how
                    }
                    };
                filtered.push(filteredItem);
            })
        });

       presidents = $filter('filter')(filtered, { term: { type: 'prez' } }, true);

       vicepresidents = $filter('filter')(filtered, { term: { type: 'viceprez' } }, true);

       angular.forEach(presidents, function (president) {
           var filteredTerm = {
               president: president,
               vicepresidents: []
           };
           angular.forEach(vicepresidents, function (vp) {
               if (vp.term.start >= president.term.start && vp.term.end <= president.term.end) {
                   filteredTerm.vicepresidents.push(vp);
               }
           })
           filteredTerms.push(filteredTerm);
       });

        $scope.terms = filteredTerms;

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
});

