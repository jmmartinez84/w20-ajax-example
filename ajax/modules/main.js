define([
    '{angular}/angular',
], function(angular) {
    'use strict';

    var module = angular.module('ajax', ['ngResource']);
    module.service('DataService', ['$http', '$q', '$timeout', function($http, $q, $timeout){
        var getData = function(){
            var deferred = $q.defer();
            $http.get('http://jsonplaceholder.typicode.com/users').then(function(response){
                $timeout(function(){
                    deferred.resolve(response.data);
                },2000);
               
            });
            return deferred.promise;
        }
        return {
            getData: getData
        }
    }]);
    module.controller('ContentController',['$scope', 'DataService', function($scope, dataService){
        $scope.getData = function(){
            $scope.btnDisabled = true;
            console.debug('get data');
            $scope.data = [];
            dataService.getData().then(function(result){
                console.debug('got data!');
                $scope.data = result;
                $scope.btnDisabled = false;
            })
        }
    }]);
	return {
		angularModules : [ 'ajax' ]
	};
});