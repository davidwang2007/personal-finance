'use strict';

angular.module('pf.money').factory('User',['$resource',function($resource){
	return $resource('/user/:id',{id:'@_id'},{
		update: {method: 'PUT'}	
	});		
}]);
