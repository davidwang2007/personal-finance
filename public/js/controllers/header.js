'use strict';
angular.module('pf.system').controller('HeaderController',['$scope','Global',function($scope,Global){
	$scope.global = Global;
	$scope.menu = [{
		'title' : 'Money List',
		'link' : 'moneys'
	},{
		title: 'Create New Money Cost',
		link: 'moneys/create'
	}];

	$scope.isCollapsed = false;
}]);
