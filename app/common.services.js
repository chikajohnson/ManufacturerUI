(function () {
    'use strict'
    angular.module('common.services', ['ngResource'])
		.constant("appSettings", {
		    // Dev Environment
		    serverPath: "http://localhost:62491/"

		    // Production
		    //serverPath: "http://risaa.evasity.com/"
		})
}());
