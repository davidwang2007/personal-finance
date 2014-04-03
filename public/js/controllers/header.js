'use strict';
angular.module('pf.system').controller('HeaderController',['$scope','Global',function($scope,Global){
	$scope.global = Global;
	$scope.menu = [{
		'title' : '消费列表',
		'link' : 'money/list',
		state: 'moneys-list'
	},{
		title: '新增消费',
		link: 'money/create',
		state: 'moneys-create'
	}];

	$scope.isCollapsed = false;
}]);
