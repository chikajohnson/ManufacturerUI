angular.module('app').controller('EditGoodTransferController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams) {


   var goodTransfer = $scope.goodTransfer;

     $scope.goodTransfer = "";
    var goodTransferCode = $stateParams.code;

    $http({
        url: ngAuthSettings.apiServiceBaseUri + 'api/goodReciepts/' + documentCode,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
        }
    }).success(function (response) {
        $scope.goodTransfer = response;
        toastr.success("goodTransfer " + response.goodTransferCode + "  loaded sucesfully");
    }).error(function (error) {
        toastr.success(error.message);
    });


    $scope.editGoodTransfer = function(goodTransfer){
        if(goodTransfer){
                 $http({
                    url: ngAuthSettings.apiServiceBaseUri + 'api/goodTransfers',
                    method: 'PUT',
                    data : goodTransfer,
                    headers: {
                        'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
                    }
                }).success(function (response) {

                    $state.go("goodTransfer.list");
                    toastr.success("goodTransfer " + response.goodTransferCode + " edited sucesfully");
                    
                }).error(function (error) {
                    toastr.error(error.message);
                });
            }
            else{
                toastr.error("No ditributor data submiitted");
            }
    };   
   
}]);