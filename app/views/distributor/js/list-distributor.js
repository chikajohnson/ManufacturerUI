angular.module('app').controller('ListDistributorController', ['$scope', '$http', 'localStorageService', '$rootScope', 'DistributorService', 'toastr', 'ngAuthSettings', '$state', function ($scope, $http, localStorageService, $rootScope, DistributorService, toastr, ngAuthSettings,  $state) {

    
    $scope.distributors = "";

        $http({
        url: ngAuthSettings.apiServiceBaseUri + 'api/distributors',
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
        // }
    }).success(function (response) {
        $scope.distributors = response;
        toastr.success("distributors loaded sucesfully");
    }).error(function (error) {
        toastr.success(error.message);
    });


     $scope.refreshDistributor = function(){
             $state.reload();
         }
  

}]);