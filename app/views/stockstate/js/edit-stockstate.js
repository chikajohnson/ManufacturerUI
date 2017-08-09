angular.module('app').controller('EditStockstateController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams','$state', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams, $state) {


    $scope.stockstate = "";
    var stockstate = $stateParams.stockstate;
     console.log(stockstate);

    $http({
        url: ngAuthSettings.apiServiceBaseUri + 'stockstates?stockState=' + stockstate,
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
        // }
    }).success(function (response) {

        console.log(response[0]);
        $scope.stockstate = response[0];
        toastr.success("Stockstate " + stockstate + " loaded sucesfully");

    }).error(function (error) {
        toastr.error("Error occured " + error.message);
    });


    $scope.editStockstate = function (stockstate) {
        if(stockstate){
             $http({
                url: ngAuthSettings.apiServiceBaseUri + 'stockstates/'+ stockstate.id,
                method: 'PUT',
                data : stockstate
                // headers: {
                //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
                // }
            }).success(function (response) {

                $state.go("stockstate.list");
                toastr.success("stockstate " + stockstate.stockState + " edited sucesfully");
                
            }).error(function (error) {
                toastr.error(error);
            });
        }
        else{
            toastr.error("No ditributor data submiitted");
        }
    }
}]);