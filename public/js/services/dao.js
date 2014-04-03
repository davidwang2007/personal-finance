'use strict';

angular.module('pf.system').factory('User',['$resource',function($resource){
	return $resource('/user/:id',{id:'@_id'},{
		update: {method: 'PUT'}	
	});		
}]);

angular.module('pf.money').factory('Money',['$resource',function($resource){
	return $resource('/money/:id',{id:'@_id'},{
		update: {method: 'PUT'}	
	});		
}]);
