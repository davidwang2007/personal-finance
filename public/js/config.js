'use strict';
// Setting up route
angular.module('pf').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	// For unmatched routes:
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home',{
		url: '/',
		templateUrl: 'views/index.html'
	});
}]);

angular.module('pf').config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');		
}]);;
