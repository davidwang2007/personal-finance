/**
 * Created by david on 2014-4-1
 * */
'use strict';
angular.module('pf',['pf.system','pf.money']);
angular.module('pf.system',['pf.base']);
angular.module('pf.money',['pf.base']);

angular.module('pf.base',['ngCookies','ngResource','ui.bootstrap','ui.router']);
