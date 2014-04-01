// User Controller
'use strict';
var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.register = function(req,res){
	res.render('users/register',{
		title: 'USER REGISTERATION'		
	});
};

exports.create = function(req,res){
	var user = new User(req.body);
	var message = '';
	user.save(function(err){
		if(err){
			switch(err.code){
				case 11000:
				case 11001:
					message = 'Username already exists';
					break;
				default:
					message = 'Please fill all the required fields';
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
