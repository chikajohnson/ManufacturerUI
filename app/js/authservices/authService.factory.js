'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, $rootScope) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var authServiceFactory = {};
    var _authentication = {
        isAuth: false,
        userName: '',
        fullName: ''
    };
    var _externalAuthData = {
        provider: '',
        userName: '',
        externalAccessToken: ''
    };

    var _saveRegistration = function (registration) {
        return $http.post(serviceBase + 'api/account/Register', registration).then(function (response) {
            return response;
        });
    };

    var _login = function (loginFormData) { 

        console.log(loginFormData);      
      
        var deferred = $q.defer();
        $http({
            url: serviceBase + 'api/token', 
            method: 'POST',
            data: loginFormData
        }).success(function (response) {           
         console.log(response);    
            localStorageService.set('authorizationTranData', { token: response.access_token, userName: loginFormData.userName });

            $rootScope.userName = loginFormData.userName;
            _authentication.isAuth = true;
            _authentication.userName = loginFormData.userName;

            deferred.resolve(response);


        }).error(function (err, status) {
            //_logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _changePassword = function (passwordData) {
        return $http.post(serviceBase + 'api/account/ChangePassword', passwordData).then(function (response) {
            return response;
        });
    };

    var _resetPassword = function (passwordData) {
        return $http.post(serviceBase + 'api/account/SetPassword', passwordData).then(function (response) {
            return response;
        });
    };

    var _disableUser = function (passwordData) {
        return $http.post(serviceBase + 'api/account/Disable', passwordData).then(function (response) {
            return response;
        });
    };

    var _enableUser = function (passwordData) {
        return $http.post(serviceBase + 'api/account/Enable', passwordData).then(function (response) {
            return response;
        });
    };

   
    var _logOut = function () {

        console.log('logging out');
        localStorageService.remove('authorizationTranData');
        //Commented out so that the browser would constantly remember
        //the last selected depot and client
        // localStorageService.remove('theclient');
        // localStorageService.remove('thedepot');
        localStorageService.remove('taskList');
        localStorageService.remove('thegroup');
        localStorageService.remove('fullName');
        localStorageService.remove('changePassword');
        localStorageService.remove('groupName');
        localStorageService.remove('UserID')
        localStorageService.remove('dashboardName')

        _authentication.isAuth = false;
        _authentication.userName = '';
     
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationTranData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName
            _authentication.fullName = localStorageService.get('fullName');
        }

    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationTranData', { token: response.access_token, userName: response.userName });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationTranData', { token: response.access_token, userName: response.userName });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.disableUser = _disableUser;
    authServiceFactory.enableUser = _enableUser;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.changePassword = _changePassword;
    authServiceFactory.resetPassword = _resetPassword;
    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);
