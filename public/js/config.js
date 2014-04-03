'use strict';
//设置日期的默认toJSON

Date.prototype.toJSON = function(){
	return this.getTime();
};

// Setting up route
angular.module('pf').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	// For unmatched routes:
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home',{
		url: '/',
		templateUrl: 'views/index.html'
	}).state('moneys-list',{
		url: '/money/list',
		templateUrl: 'views/moneys/list.html',
		controller: 'MoneyListController'
	}).state('moneys-create',{
		url: '/money/create',
		templateUrl: 'views/moneys/create.html',
		controller: 'MoneyCreateController'
	}).state('moneys-detail',{
		url: '/money/detail/:id',
		templateUrl: 'views/moneys/detail.html',
		controller: 'MoneyDetailController'
	}).state('moneys-update',{
		url: '/money/update/:id',	
		templateUrl: 'views/moneys/update.html',
		controller: 'MoneyUpdateController'
	});
}]);

angular.module('pf').config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');		
}]);;
