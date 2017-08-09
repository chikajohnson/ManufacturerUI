angular.module('app').controller('CreateProductController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams','$state', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams, $state) {

    $scope.product = "";
   
    $scope.createProduct = function (product) {

        console.log(product);

        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'products',
            method: 'POST',
            data: product,
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {
           
            toastr.success("Product " + response.productCode + " created sucesfully");
            $state.go('product.list');

        }).error(function (error) {
            toastr.error("Error occured " + error.message);
        });
    }
}]);