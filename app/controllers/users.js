// User Controller
'use strict';
var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.register = function(req,res){
	res.render('users/register',{
		title: '用户注册'		
	});
};

exports.login = function(req,res){
	res.render('users/login',{
		title: '用户登录'		
	});
};

exports.create = function(req,res,next){
	var user = new User(req.body);
	var message = '';
	user.save(function(err){
		if(err){
			switch(err.code){
				case 11000:
				case 11001:
					message = '用户名已存在，请更换其它名称';
					break;
				default:
					message = '请填写必填项';
					break;
			}

			return res.jsonp({
				result: 1,
				message: message
			});
		}		

		req.logIn(user,function(err){
			if(err) return next(err);
			return res.jsonp({result:0});

		});
	});
};

exports.logout = function(req,res){
	req.logout();
	res.redirect('/');
};

