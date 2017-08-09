'use strict';
app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};
       
        var authData = localStorageService.get('authorizationTranData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }
         

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === -1) {
            //logger.broadcast('Error while trying to communicate with the server. Kindly contact system administrator for help', "error");
        }
        if (rejection.status === 401) {
            var auth = $injector.get('authService');
            auth.logOut();
        }
        //if (rejection.status === 401) {
        //    authService.logOut();
        //}
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;

}]);