'use strict';
var users = require('../controllers/users');
module.exports = function(app,passport){
	app.get('/register',users.register);
	app.post('/user',users.create);
	app.get('/logout',users.logout);
	app.get('/login',users.login);
	app.post('/login',function(req,res,next){
		passport.authenticate('local',function(err,user,info){
			if(err) return next(err);
			if(!user){
				return res.jsonp({
					result: 1,
					message: info.message
				});
			}
			req.logIn(user,function(err){
				if(err) return next(err);
				return res.jsonp({result: 0});
			});
		})(req,res,next);		
	});
};
