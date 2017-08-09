angular.module('app').controller('CreateDistributorController', ['$scope', '$http', 'localStorageService', '$rootScope', 'DepotService', 'toastr', 'ngAuthSettings', '$state',function ($scope, $http, localStorageService, $rootScope, DepotService, toastr, ngAuthSettings,$state ) {



    var distributor = $scope.distributor;

    DepotService.getAllDepots().then(function(data){ 
        //console.log(data);          
        $scope.depots = data;
       //console.log($scope.distributor);
    });  

    $scope.createDistributor = function (distributor) {
        
        if(distributor){
             $http({
                url: ngAuthSettings.apiServiceBaseUri + 'distributors',
                method: 'POST',
                data : distributor,
                // headers: {
                //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
                // }
            }).success(function (response) {

                $state.go("distributor.list");
                toastr.success("distributor " + distributor.distributorCode + " created sucesfully");            
                
            }).error(function (error) {
                toastr.error(error.message);
            });
        }
        else{
            toastr.error(error.message);
        }

   
}
  

}]);