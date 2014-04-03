/**
 * Money Controller
 * @author D.W.
 * */
'use strict';

angular.module('pf.money').controller('MoneyListController',['$scope','Money','$stateParams','Global',function($scope,Money,$stateParams,Global){
	$scope.global = Global;
	$scope.moneys = Money.query();
	$scope.remove = function($index){
		$scope.moneys[$index].$remove(function(data){
			$scope.message = data.message;
			if(data.result == 0){
				$scope.moneys.splice($index,1);
			}	
		});	
	};
}]);

angular.module('pf.money').controller('MoneyCreateController',['$scope','Money','$http','$state',function($scope,Money,$http,$state){
	$scope.money = {costDate: Date.now()};
	$scope.maxDate = Date.now();
	$scope.doCreate = function(){
		new Money($scope.money).$save(function(data){
			$scope.message = data.message;
			if(data.result == 0){
				$state.go('moneys-list');				
			}
		});
	};
	$scope.open = function($event){
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};
}]);


angular.module('pf.money').controller('MoneyDetailController',['$scope','Money','$state','$stateParams',function($scope,Money,$state,$stateParams){
		$scope.money = Money.get({id:$stateParams.id});
}]);

angular.module('pf.money').controller('MoneyUpdateController',['$scope','Money','$state','$stateParams',function($scope,Money,$state,$stateParams){
		$scope.money = Money.get({id:$stateParams.id},function(money){
			$scope.oldMoney = angular.copy(money);		
		});
		$scope.doUpdate = function(){
			$scope.money.update(function(data){
				$scope.message = data.message;
				if(data.result == 0){
					$state.go('moneys-list');
				}
			});
		};
		$scope.isUnchanged = function(){
			return angular.equals($scope.money,$scope.oldMoney);
		};
}]);

