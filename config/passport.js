// passport lib
'use strict';
var mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy,
	User = mongoose.model('User'),
	config = require('./config');

module.exports = function(passport){
	// Serialize the user id to push into the session
	passport.serializeUser(function(user,done){
		done(null,user.id);			
	});

	// Deserialize the user object based on pre-serialized token
	// which is the user id
	passport.deserializeUser(function(id,done){
		User.findOne({
			_id: id	
		},'-salt -hashed_password',function(err,user){
			done(err,user);
		});		
	});

	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},function(username,password,done){
		User.findOne({
			username: username	
		},function(err,user){
			if(err) return done(err);
			if(!user){
				return done(null,false,{message: '用户名不存在'});
			}
			if(!user.authenticate(password))
				return done(null,false,{
					message: '用户名密码不匹配'
				});
			return done(null,user);
		});
	}));
};
