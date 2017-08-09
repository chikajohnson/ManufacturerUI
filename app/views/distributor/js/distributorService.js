angular.module('app').factory('DistributorService', ['$http', '$q', 'ngAuthSettings', 'localStorageService', '$rootScope', function ($http, $q, ngAuthSettings, localStorageService, $rootScope) {

    var distributorFactory = {};

    var deferred = $q.defer();

    distributorFactory.getAllDistributors = function () {
     $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/distributors',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    distributorFactory.getDistributor = function (distributorCode) {
        console.log(" Logging + " + distributorCode);
        
        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/distributors/' + distributorCode,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            }
        }).success(function (response) {

            //console.log(response);
            deferred.resolve(response);
        }).error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    return distributorFactory;
}]);