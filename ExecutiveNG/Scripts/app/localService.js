var cardsServices = angular.module('executivesServices', ['ngResource']);

cardsServices.factory('Executives', ['$resource',
  function ($resource) {
      return $resource('/Scripts/app/executive.json', {}, {
          query: { method: 'GET', params: {}, isArray: true }
      });
  }]);