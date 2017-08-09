angular.module('app').controller('CreateGoodTransferController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams) {

    $scope.goodTransfer = "";
   
    $scope.createGoodTransfer = function () {

        console.log($scope.goodTransfer);

        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/goodReciepts/',
            method: 'POST',
            data: $scope.goodTransfer,
            headers: {
                'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            }
        }).success(function (response) {

            console.log(response);
            $scope.goodTransfer = response;
            toastr.success("GoodTransfer " + response.documentCode + " created sucesfully");

        }).error(function (error) {
            toastr.error("Error occured " + error.message);
        });
    }
}]);