angular.module('app').controller('EditProductController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr', '$stateParams', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $stateParams) {


    var product = $scope.product;

     $scope.product = "";
    var productCode = $stateParams.productCode;

    console.log(" Loading + " + productCode);

    $http({
        url: ngAuthSettings.apiServiceBaseUri + 'products?productCode=' + productCode,
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
        // }
    }).success(function (response) {
        $scope.product = response[0];
        console.log($scope.product)
        toastr.success("product " + response[0].productCode + "  loaded sucesfully");
    }).error(function (error) {
        toastr.success(error.message);
    });


    $scope.editProduct = function(product){
        if(product){
             $http({
            url: ngAuthSettings.apiServiceBaseUri + 'products/' + product.id,
            method: 'PUT',
            data: product
           
            }).success(function (response) {

                console.log(response);
                $scope.product = response;
                toastr.success("Product " + productCode + " updated sucesfully");

            }).error(function (error) {
                toastr.error("Error occured " + error.message);
            });
       };   
     }
              
}]);