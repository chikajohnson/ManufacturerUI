angular.module('app').controller('ListGoodTransferController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$state',function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $state) {

    $scope.goodTransfers = "";
   
        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'goodReceipts',
            method: 'GET',
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {
            console.log(response);
            $scope.goodTransfers = response;
            toastr.success("GoodTransfers loaded sucesfully");

        }).error(function (error) {

            toastr.error("Error occured " + error.message);
        });

        

        $scope.refreshGoodTransfer= function () {
           $state.reload();
        }
    

}]);