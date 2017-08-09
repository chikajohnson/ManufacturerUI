angular.module('app').controller('ListStockstateController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$state', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $state) {

    $scope.stockstates = "";
   
        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/stockstates',
            method: 'GET',
           
        }).success(function (response) {
            console.log(response);
            $scope.stockstates = response;
            toastr.success("Stockstates loaded sucesfully");

        }).error(function (error) {

            toastr.error("Error occured " + error.message);
        });

        
    $scope.refreshStockState = function(){
             $state.reload();
         }


}]);