'use strict';
app.controller('loginController', ['$http', '$scope', 'authService', 'localStorageService', 'ngAuthSettings', '$rootScope', '$state', 'toastr', function ($http, $scope, authService, localStorageService, ngAuthSettings, $rootScope, $state, toastr) {

    // Logged in users cannot access this controller

    if (authService.authentication.isauth) {
        $state.go('index.dashboard');
    }

    $rootScope.userName = '';

    //Login model
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";


    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {
            console.log(response);
            $scope.authentication = authService.authentication; //set authentication parameters
            localStorageService.set('fullName', response.FullName);
            if (!localStorageService.get('thedepot')) {
                localStorageService.set('thedepot', response.DefaultDepotID);
            }
            localStorageService.set('thegroup', response.DefaultGroupID);
            localStorageService.set('changePassword', response.ChangePassword);
            localStorageService.set('groupName', response.UserGroup);
            localStorageService.set('dashboardName', response.DashboardName);
            localStorageService.set('UserID', response.Id);

            $rootScope.userName = localStorageService.get('authorizationTranData').userName;
            //console.log($rootScope.userName);
            toastr.success("Login successful");
            $state.go('index.dashboard');
        },
         function (error) {            
             toastr.error(error.message);
         });;
    };


    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }
}]);
app.controller('logoutController', [
    '$scope', '$location', 'authService', 'localStorageService', '$state', function ($scope, $location, authService, localStorageServic, $state) {

        $scope.authentication = false;

        $scope.logout = function () {
            authService.logOut();
            var indexAuthState = function () {
                var authData = localStorageService.get('authorizationELMData');
                if (authData) {
                    $scope.authentication = true;
                    //_authentication.userName = authData.userName;
                }
            };
            $state.go('access.login');
        };
        

      }
]);

