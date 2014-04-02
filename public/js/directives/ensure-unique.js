'use strict';

angular.module('pf.system').directive('ensureUnique',['$http',function($http){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope,ele,attrs,ctrl){
			scope.$watch(attrs.ngModel,function(val){
				if(ele.val() == ''){
					ctrl.$setValidity('unique',true);		
					return;
				}
				$http.post('/api/check/'+attrs.ensureUnique,{value: ele.val(),field:attrs.name})
					.success(function(data){
						ctrl.$setValidity('unique',data.result === 0);	
					})
					.error(function(){
						ctrl.$setValidity('unique',false);		
					});	
			});
		}
	};		
}]);
