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
	}).state('redirect',{
		url: '/error/redirect',
		templateurl: 'views/redirect.html',
		controller: 'IndexController'
	});
}]);

angular.module('pf').config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix('!');		
}]);

// add xhr header
angular.module('pf').config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';		
	$httpProvider.interceptors.push('interceptor401');

}]);
