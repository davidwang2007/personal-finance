'use strict';
var users = require('../controllers/users');
module.exports = function(app,passport){
	app.get('/register',users.register);
	app.post('/user',users.create);
	app.get('/logout',users.logout);
};
