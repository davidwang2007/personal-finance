'use strict';
angular.module('pf.system').controller('AuthController',['$scope','Global','User','$location','$http','$window',function($scope,Global,User,$location,$http,$window){
	$scope.global = Global;
	$scope.doRegister = function(){
		console.log($scope.user);
		new User($scope.user).$save(function(data){
			console.log('save user, server response ',data);	
			$scope.message = data.message;
			if(data.result == 0)
				$window.location.href = '/';
		});
	};	

	$scope.doLogin = function(){
		$http.post('/login',$scope.user).success(function(data){
			// console.log('login server response data == ',data);	
			$scope.message = data.message;
			// console.log($window.location);
			if(data.result === 0)
				$window.location.href = '/';
		});
	};
}]);
