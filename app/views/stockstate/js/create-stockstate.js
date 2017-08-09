angular.module('app').controller('CreateStockstateController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams) {

    $scope.stockstate = "";
   
    $scope.createStockstate = function (stockstate) {

        console.log(stockstate);

        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'stockstates',
            method: 'POST',
            data: stockstate
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {
            $state.go('stockstate.list');
            toastr.success("Stockstate " + stockstate.stockState + " created sucesfully");

        }).error(function (error) {
            toastr.error("Error occured " + error.message);
        });
    }
}]);