angular.module('app').controller('EditDistributorController', ['$scope', '$http', 'localStorageService', '$rootScope', 'DepotService', 'toastr', 'ngAuthSettings', '$state', '$stateParams',function ($scope, $http, localStorageService, $rootScope, DepotService, toastr, ngAuthSettings,$state, $stateParams ) {

    $scope.depots = "";
    var distributor = $scope.distributor;

    DepotService.getAllDepots().then(function(data){ 
              
        $scope.depots = data;
    });  

    var distributorCode = $stateParams.distributorCode;

    $http({
        url: ngAuthSettings.apiServiceBaseUri + 'distributors?distributorCode=' + distributorCode,
        method: 'GET'
    }).success(function (response) {
        console.log(response[0]);
        $scope.distributor = response[0];
        $scope.distributor.commencementDate = new Date(response[0].commencementDate);
        toastr.success("distributor " + response[0].distributorCode + "  loaded sucesfully");
    }).error(function (error) {
        toastr.success(error.message);
    });


    $scope.editDistributor = function(distributor){
        if(distributor){
             $http({
                url: ngAuthSettings.apiServiceBaseUri + 'distributors/' + distributor.id,
                method: 'PUT',
                data : distributor
            }).success(function (response) {

                $state.go("distributor.list");
                toastr.success("distributor " + response.distributorCode + " edited sucesfully");
                
            }).error(function (error) {
                toastr.error(error.message);
            });
        }
        else{
            toastr.error("No ditributor data submiitted");
        }
    };   
   
  

}]);