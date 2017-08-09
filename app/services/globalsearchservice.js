angular.module('app').factory('GlobalSearchService', ['localStorageService', '$rootScope', function (localStorageService, $rootScope) {

    var searchFactory = {};

    
    searchFactory.searchContext = function (searchText) {
        $rootScope.searchInput = searchText;
    };

    return searchFactory;
}]);