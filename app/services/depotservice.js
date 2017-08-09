angular.module('app').factory('DepotService', ['$http', '$q', 'ngAuthSettings', 'localStorageService', '$rootScope', function ($http, $q, ngAuthSettings, localStorageService, $rootScope) {

    var depotFactory = {};

    var deferred = $q.defer();

    depotFactory.getAllDepots = function () {
     $http({
            url: ngAuthSettings.apiServiceBaseUri + 'depots',
            method: 'GET',
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {
            deferred.resolve(response);
        });

        return deferred.promise;
    };


    depotFactory.getDepot = function (depotCode) {
        
        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'depots?depotCode=' + depotCode,
            method: 'GET',
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {

            //console.log(response);
            deferred.resolve(response);
        });

        return deferred.promise;
    };

    return depotFactory;
}]);