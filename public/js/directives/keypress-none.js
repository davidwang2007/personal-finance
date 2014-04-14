/**
 * 此directive用来解决在input type="text" 的情况下 按下任何键盘都不输入的目的
 * @author D.W.
 * @date 2014-4-3 13:20:57
 * */
'use strict';

angular.module('pf.system').directive('keypressNone',function(){
	return {
		restrict: 'A',
		link: function(scope,element,attrs){
			element.on('keydown',function($event){
				//console.log('which keyCode charCode');
				//console.log($event.which,$event.keyCode,$event.charCode);
				$event.preventDefault();
				$event.stopPropagation();
			});
		}
	};
});
