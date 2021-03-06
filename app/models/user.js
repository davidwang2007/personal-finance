//mongoose user model
'use strict';

/**
 * Module dependencies
 * */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * User Schema
 * realname
 * email
 * username
 * salt
 * hashed_password
 * */
var UserSchema = new Schema({
	realname: {type: String, required: true},
	email: String,
	username: {type: String, unique: true},
	hashed_password: String,
	salt: String
});

UserSchema.virtual('password').set(function(password){
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.encryptPassword(password);
}).get(function(){
	return this._password;	
});

var validatePresenceOf = function(value){
	return value && value.length;
};

// The 4 validations below only apply
// if you are signing up traditionally.
UserSchema.path('realname').validate(function(name){
	return (typeof name === 'string' && name.length > 0);		
},'Name cannot be blank');

UserSchema.path('email').validate(function(email){
	return (typeof email === 'string' && email.length > 0);		
},'Email cannot be blank');

UserSchema.path('username').validate(function(username){
	return (typeof username === 'string' && username.length > 0);		
},'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password){
	return (typeof hashed_password === 'string' && hashed_password.length > 0);		
},'Password cannot be blank');

// Pre-save hook
UserSchema.pre('save',function(next){
	if(!this.isNew) return next();
	if(!validatePresenceOf(this.password))
		next(new Error('Invalid password'));
	else
		next();

});

UserSchema.methods = {
	/**
	 * Authenticate - check if the password are the same
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 * */
	authenticate: function(plainText){
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 * */
	makeSalt: function(){
		return crypto.randomBytes(16).toString('base64');		  
	},
	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 * */	
	encryptPassword: function(password){
		if(!password || !this.salt) return '';
		var salt = new Buffer(this.salt,'base64');
		return crypto.pbkdf2Sync(password,salt,10000,64).toString('base64');
	}
};

mongoose.model('User',UserSchema);
