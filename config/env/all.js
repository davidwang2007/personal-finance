// config all.js
'use strict';
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: 3000,
	db: process.env.MONGOHQ_URL,
	templateEngine: 'jade',//'swig',
	// The secret should be set to a none-guessable string that
	// is used to compute a session hash
	sessionSecret: 'personal finance',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'pf-sessions'
};
