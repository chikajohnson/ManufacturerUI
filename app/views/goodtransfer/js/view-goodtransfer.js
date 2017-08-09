angular.module('app').controller('ViewGoodTransferController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', 'GoodTransferDetailService', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams, GoodTransferDetailService) {

    $scope.goodTransfer = "";
    var documentNo = $stateParams.documentNo;   



  
       $http({
            url: ngAuthSettings.apiServiceBaseUri + 'goodReceipts?documentNo=' + documentNo,
            method: 'GET'
        }).success(function (response) {
            
            
            $scope.goodTransfer = response[0];
            
            GoodTransferDetailService.getGoodTransferNoteDetail(response[0].id).then(function(data){ 
                       
            
            $scope.goodTransfer.productCode = data[0].productCode || 'NA';
            $scope.goodTransfer.productName = data[0].productName || 'NA';
            $scope.goodTransfer.receivedQuantity = data[0].receivedQuantity || 0;
            $scope.goodTransfer.stockStateName = data[0].stockStateName || 'NA';
            $scope.goodTransfer.measurementUnit = data[0].measurementUnit || 'NA';

            $scope.goodTransfer.transactionDate = new Date(response[0].transactionDate);

           
            });  

            toastr.success("GoodTransfer " + response[0].documentNo + " loaded sucesfully");
           
        }).error(function (error) {
            toastr.error("Error occured " + error.message);
        });
}]);