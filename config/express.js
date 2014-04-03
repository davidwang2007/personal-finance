// Express config
'use strict';
var express = require('express'),
	consolidate = require('consolidate'),
	mongoStore = require('connect-mongo')(express),
	flash = require('connect-flash'),
	helpers = require('view-helpers'),
	config = require('./config');

//更改日期默认的toJSON
Date.prototype.toJSON = function(){
	return this.getTime();
};


module.exports = function(app,passport,db){
	app.set('showStackError',true);

	app.locals.pretty = true;
	app.locals.cache = 'memory';

	// 暂时不使用压缩，不用节约带宽
	/*
	app.use(express.compress({
		filter: function(req,res){
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));
	*/

	// only use logger for development environment
	if(process.env.NODE_ENV === 'development'){
		app.use(express.logger('dev'));	
	}

	// assign the template engine to jade files
	app.engine('jade',consolidate[config.templateEngine]);
	app.set('view engine','jade');

	app.set('views',config.root + '/app/views');

	app.enable('jsonp callback');
	app.configure(function(){
		app.use(express.cookieParser());		
		app.use(express.urlencoded());
		app.use(express.json());
		app.use(express.methodOverride());
		app.use(express.session({
			secret: config.sessionSecret,
			store: new mongoStore({
				db: db.connection.db,
				collection: config.sessionCollection
			})
		}));

		app.use(helpers(config.app.name));

		app.use(passport.initialize());
		app.use(passport.session());
		app.use(flash());
		app.use(express.favicon());
		app.use(express.static(config.root + '/public'));
		/**
		 * 添加自定义的权限，即在未登录的情况下不允许访问
		 * @author D.W.
		 * @date 2014-4-3
		 * */
		var safeUrls = ['/register','/login','/'];
		app.use(function(req,res,next){
			if(~safeUrls.indexOf(req.url) || req.isAuthenticated())
				next();
			else // 否则重定向到首页
				res.redirect('/');
		});
		app.use(app.router);

		app.use(function(err,req,res,next){
			var accept = req.header('accept');
			if(~accept.indexOf('application/json')){
				return res.jsonp(200,{result:1,message: err.message});	
			}
			if(~err.message.indexOf('not found'))
				return next();
			console.error(err.statck);
			res.status(500).render('500',{error: err.stack});
		});

		// 初步判断 由于此method签名为二个参数，所以当404的时候直接调用的这个方法
		app.use(function(req,res){
			res.status(404).render('404',{
				url: req.originalUrl,
				error: 'Not found'
			});		
		});

	});
};
