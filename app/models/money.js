//money entity
'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Money Schema
 * created {Date}
 * cost {Number}
 * costDate {Date}
 * user: ObjectId
 * desc {String}
 * */
var MoneySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	cost: {
		type: Number,
		default: 0
	},
	costDate: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true

	},
	desc: {
		type: String,
		required: true
	}
});

MoneySchema.path('desc').validate(function(desc){
	return desc.length;		
},'Description cannot be blank');

MoneySchema.statics.load = function(id,cb){
	this.findOne({
		_id: id		
	}).populate('user','realname email username').exec(cb);
};

mongoose.model('Money',MoneySchema);
