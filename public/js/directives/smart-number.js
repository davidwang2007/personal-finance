/**
 * float输入验证directive
 * @author D.W.
 * @time 2014-4-3 13:29:22
 * */
'use strict';

angular.module('pf.system').directive('smartFloat',function(){
	var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope,ele,attrs,ctrl){
			ctrl.$parsers.unshift(function(viewValue){
				if(FLOAT_REGEXP.test(viewValue)){
					ctrl.$setValidity('float',true);
					return parseFloat(viewValue.replace(',','.'));
				}else{
					ctrl.$setValidity('float',false);
					return undefined;
				}
			});
		}
	};		
}).directive('smartInteger',function(){
	var INTEGER_REGEXP = /^\-?\d+$/;
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope,ele,attrs,ctrl){
			ctrl.$parsers.unshift(function(viewValue){
				if(INTEGER_REGEXP.test(viewValue)){
					ctrl.$setValidity('integer',true);
					return parseInt(viewValue);
				}else{
					ctrl.$setValidity('integer',false);
					return undefined;
				}
			});
		}
	};	
});
