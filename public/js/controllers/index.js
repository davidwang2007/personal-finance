'use strict';
angular.module('pf.system').controller('IndexController',['$scope','Global',function($scope,Global){
	$scope.global = Global;		
}]).controller('RedirectController',['$stateParams','$window','$timeout',function($stateParams,$window,$timeout){
	console.log(arguments);	
	$scope.status = $stateParams.status;
	$scope.message = $stateParams.message;
}]);

