/**
 * Money Controller
 * @author D.W.
 * */
'use strict';

angular.module('pf.money').controller('MoneyListController',['$scope','Money',
		'$modal','$stateParams','Global',function($scope,Money,$modal,$stateParams,Global){
	$scope.global = Global;
	$scope.moneys = Money.query();
	//下面三行代码是为了以后使用，即做统计分析之用
	$scope.$watch('moneys.length',function(){
		// console.log('moneys change',arguments);	
		$scope.sumPrice = $scope.moneys.reduce(function(a,b){
			return a + b.cost;	
		},0);
	});
	$scope.remove = function($index){
		$scope.moneys[$index].$remove(function(data){
			$scope.message = data.message;
			if(data.result == 0){
				$scope.moneys.splice($index,1);
			}	
		});	
	};

	$scope.openDetail = function($index){
		//var money = $scope.moneys[$index];
		var modalInstance = $modal.open({
			templateUrl: 'moneyDetail.html',
			controller: ModalDetailController,
			resolve: {
				money: function(){
					return $scope.moneys[$index];
				}
			}
		});	
	};

	function ModalDetailController($scope,$modalInstance,money){
		$scope.money = money;
		$scope.ok = function(){
			$modalInstance.dismiss('cancel');
		};
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
			$scope.money.$update(function(data){
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

