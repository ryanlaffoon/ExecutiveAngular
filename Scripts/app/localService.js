var executivesServices = angular.module('executivesServices', ['ngResource']);

executivesServices.factory('Executives', ['$resource',
  function ($resource) {
      return $resource('/Scripts/app/executive.json', {}, {
          query: { method: 'GET', params: {}, isArray: true }
      });
  }]);