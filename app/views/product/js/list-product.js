angular.module('app').controller('ListProductController', ['$scope', '$http', 'localStorageService', '$rootScope', 'ngAuthSettings', 'toastr','$state', function ($scope, $http, localStorageService, $rootScope, ngAuthSettings, toastr, $state) {

    $scope.products = "";

   
        $http({
            url: ngAuthSettings.apiServiceBaseUri + 'api/products',
            method: 'GET',
            // headers: {
            //     'Authorization': 'Bearer ' + localStorageService.get('authorizationTranData').token
            // }
        }).success(function (response) {

            $scope.products = response;
            toastr.success("Products loaded sucesfully");

        }).error(function (error) {

            toastr.error("Error occured " + error.message);
        });

        $scope.deleteProduct = function(product){
            console.log(product);            
            confirm("product");
            if(product){
                $http({
                 url: ngAuthSettings.apiServiceBaseUri + 'products/' + product.id,
                 method: 'DELETE',
                 data: product
                }).success(function (response) {

                    $scope.products = response;
                    toastr.success("Products " + response.productCode +  " deleted successfully");
                    $state.go('product.list');

                }).error(function (error) {

                    toastr.error("Error occured : " + error.message);
                });
            }
             toastr.error("Error occured: no product to delete ");
             
        }   

         $scope.refreshProduct = function(){
             $state.reload();
         }

}]);