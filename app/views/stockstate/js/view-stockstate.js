angular.module('app').controller('ViewStockstateController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams) {

    $scope.stockstate = "";
    var stockstate = $stateParams.stockstate;   

    console.log("stockstate " + stockstate);

  
       $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/stockstates/' + stockstate,
            method: 'GET'
        }).success(function (response) {
            
            console.log(response);
            $scope.stockstate = response;
            toastr.success("Stockstate " + stockstate + " loaded sucesfully");
           
        }).error(function (error) {
            toastr.error("Error occured " + error.message);
        });
}]);