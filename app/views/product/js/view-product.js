angular.module('app').controller('ViewProductController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams) {


    $scope.product = "";
    var productCode = $stateParams.productCode;   

  
        console.log(" Loading + " + productCode);

        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/products/' +  productCode,
            method: 'GET',
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {
            
           
            $scope.product = response;
            toastr.success("Product " + productCode + " loaded sucesfully");
           
        }).error(function (error) {
            toastr.error("Error occured " + error.message);
        });
}]);