'use strict';
angular.element(document).ready(function(){
	if(window.location.hash === '#_=_')	window.location.hash = '#!';
	angular.bootstrap(document,['pf']);
});
