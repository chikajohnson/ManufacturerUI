angular.module('app').controller('ViewDistributorController', ['$scope', '$http', 'localStorageService', '$rootScope', 'DistributorService', 'toastr', '$stateParams', 'ngAuthSettings', 'DepotService','$state', function ($scope, $http, localStorageService, $rootScope, DistributorService, toastr, $stateParams, ngAuthSettings, DepotService, $state) {

  
    $scope.distributor = "";
    var distributorCode = $stateParams.distributorCode;

    console.log(distributorCode);
    $http({
        url: ngAuthSettings.apiServiceBaseUri + 'api/distributors/' + distributorCode,
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
        // }
    }).success(function (response) {
        //console.log(response[0].depotCode);
       // console.log(response[0]);
       
        $scope.distributor = response;
        DepotService.getDepot(response.depotCode).then(function(data){ 
        //console.log(data[0]);          
        $scope.distributor.depotName = data.depotName;
       //console.log($scope.distributor);
    });    
        toastr.success("distributor " + response.distributorCode + "  loaded sucesfully");

    }).error(function (error) {
        toastr.success(error.message);
    });


   
       

}]);