/**
 * 自定义过滤器
 * */
'use strict';
angular.module('pf.system').factory('interceptor401',['$q','$window','$timeout',function($q,$window,$timeout){
	return {
		'request': function(config){return $q.when(config);},
		'response': function(config){return $q.when(config);},
		'responseError': function(rejection){
			console.log('responseError: ',rejection);	
			if(rejection.status == 401){//表示没有权限
				$window.alert(rejection.data.message);
				$window.location.href='/';
			}
			return $q.reject(rejection);
		},
		'requestError': function(rejection){
			console.log('requestError: ',rejection);	
			return $q.reject(rejection);
		}
	};		
}]);
