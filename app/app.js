
    'use strict'

    var app = angular.module('app', ['ui.router', 'LocalStorageModule', 'ngAnimate', 'toastr', 'angularUtils.directives.dirPagination'])
    
        .service('sharedProperties', function () {
            var property;

            return {
                getProperty: function () {
                    return property;
                },
                setProperty: function (value) {
                    property = value;
                }
            };
        });


    app.value('errorCounter', 0);

    app.run(['$rootScope','localStorageService', function ($rootScope, localStorageService) {

        $rootScope.searchInput = "";
        if(localStorageService.get('authorizationTranData')){
             $rootScope.userName = localStorageService.get('authorizationTranData').userName;
     }

    }]);
       


// Development
    var serviceAuth = 'http://research01:85/';
    var serviceDataUrl = 'http://localhost:19072/'; // route to the same origin Web Api controller

// Production
//var serviceAuth = 'http://localhost:85/'; //,
// var serviceDataUrl = 'http://localhost:86/'; // route to the same origin Web Api controller
    
    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceAuth,
        serviceDataUrl: serviceDataUrl,
        clientId: 'ngAuthApp'      

    });



    app.config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 5,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            progressBar: true,
            timeOut: 3000,
            titleClass: 'toast-title',
            toastClass: 'toast',
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            }
        });
    });



     app.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('index', { url: '/index', abstract: true, templateUrl: 'app/views/masterPage.html' })
        .state('access', { url: '/access', abstract: true, templateUrl: 'app/views/loginMasterPage.html' })
        .state('distributor', { url: '/distributor', abstract: true, templateUrl: 'app/views/masterPage.html' })
        .state('goodtransfer', { url: '/goodtransfer', abstract: true, templateUrl: 'app/views/masterPage.html' })
         .state('goodtransfer1', { url: '/goodtransfer1', abstract: true, templateUrl: 'app/views/masterPage.html' })
        .state('product', { url: '/product', abstract: true, templateUrl: 'app/views/masterPage.html' })
        .state('stockstate', { url: '/stockstate', abstract: true, templateUrl: 'app/views/masterPage.html' })

        //Distributor 
        .state('distributor.list', { url: '/list', views: { 'mainContent': { templateUrl: 'app/views/distributor/list-distributor.html',  controller: 'ListDistributorController' } } })
         .state('distributor.create', { url: '/create', views: { 'mainContent': { templateUrl: 'app/views/distributor/create-distributor.html', controller: 'CreateDistributorController' } } })
         .state('distributor.edit', { url: '/edit/:distributorCode', views: { 'mainContent': { templateUrl: 'app/views/distributor/edit-distributor.html', controller: 'EditDistributorController' } } })
         .state('distributor.view', { url: '/view/:distributorCode', views: { 'mainContent': { templateUrl: 'app/views/distributor/view-distributor.html', controller: 'ViewDistributorController' } } })

        //Good Transfer notes 
        .state('goodtransfer.list', { url: '/list', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer/list-goodtransfer.html' , controller: 'ListGoodTransferController'} } })
        .state('goodtransfer.create', { url: '/create', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer/create-goodtransfer.html', controller: 'CreateGoodTransferController' } } })
        .state('goodtransfer.edit', { url: '/edit/:documentNo', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer/edit-goodtransfer.html' , controller: 'EditGoodTransferController'} } })
        .state('goodtransfer.view', { url: '/view/:documentNo', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer/view-goodtransfer.html', controller: 'ViewGoodTransferController'} } })


        //Good Transfer notes 1
        .state('goodtransfer1.list', { url: '/list', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer1/list-goodtransfer1.html' } } })
        .state('goodtransfer1.create', { url: '/create', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer1/create-goodtransfer1.html' } } })
        .state('goodtransfer1.edit', { url: '/edit', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer1/edit-goodtransfer1.html' } } })
        .state('goodtransfer1.view', { url: '/view', views: { 'mainContent': { templateUrl: 'app/views/goodtransfer1/view-goodtransfer1.html' } } })


        //Product 
        .state('product.list', { url: '/list', views: { 'mainContent': { templateUrl: 'app/views/product/list-product.html', controller: 'ListProductController' } } })
         .state('product.create', { url: '/create', views: { 'mainContent': { templateUrl: 'app/views/product/create-product.html', controller: 'CreateProductController' } } })
         .state('product.edit', { url: '/edit/:productCode', views: { 'mainContent': { templateUrl: 'app/views/product/edit-product.html', controller: 'EditProductController' } } })
         .state('product.view', { url: '/view/:productCode', views: { 'mainContent': { templateUrl: 'app/views/product/view-product.html', controller: 'ViewProductController' } } })

        //stockstate 
        .state('stockstate.list', { url: '/list', views: { 'mainContent': { templateUrl: 'app/views/stockstate/list-stockstate.html', controller: 'ListStockstateController' } } })
         .state('stockstate.create', { url: '/create', views: { 'mainContent': { templateUrl: 'app/views/stockstate/create-stockstate.html', controller: 'CreateStockstateController' } } })
         .state('stockstate.edit', { url: '/edit/:stockstate', views: { 'mainContent': { templateUrl: 'app/views/stockstate/edit-stockstate.html', controller: 'EditStockstateController' } } })
         .state('stockstate.view', { url: '/view/:stockstate', views: { 'mainContent': { templateUrl: 'app/views/stockstate/view-stockstate.html', controller: 'ViewStockstateController' } } })


        //dashboard 
        .state('index.dashboard', { url: '/dashboard', views: { 'mainContent': { templateUrl: 'app/views/dashboard.html' } } })


        //access
       .state('access.login', { url: '/auth', views: { 'loginContent': { templateUrl: 'app/views/login/login.html', controller: 'loginController' } } })



        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/access/auth');
     });

     app.config(function ($httpProvider) {
         $httpProvider.interceptors.push('authInterceptorService');
     });

     app.run(RouteRunConfig);

     
     RouteRunConfig.$inject = ['$rootScope', '$location', 'localStorageService', 'ngAuthSettings', 'authService'];
     function RouteRunConfig($rootScope, $location, localStorageService, ngAuthSettings, authService) {
         authService.fillAuthData();
               
     }

     


