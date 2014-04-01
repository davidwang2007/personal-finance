'use strict';
angular.module('pf.system').controller('AuthController',['$scope','Global','User','$location',function($scope,Global,User,$location){
	$scope.global = Global;
	$scope.doRegister = function(){
		console.log($scope.user);
		new User($scope.user).$save(function(data){
			console.log('save user, server response ',data);	
			$scope.message = data.message;
			if(data.result == 0)
				window.location.href = '/';
		});
	};	
}]);
