'use strict';

var mongoose = require('mongoose'),
	Money = mongoose.model('Money');


// 查询列表
exports.list = function(req,res,next){
	Money.find({
		user: req.user		
	},function(err,moneys){
		if(err) return next(err);
		res.jsonp(moneys);
	});	
};

exports.create = function(req,res,next){
	var money = new Money(req.body);
	money.user = req.user;
	money.save(function(err,money){
		if(err) return next(err);
		res.jsonp({result:0,money:money});
	});
};

exports.remove = function(req,res){
	Money.findByIdAndRemove(req.params.id,function(err,money){
		if(err) return next(err);
		res.jsonp({result:0, money:money});
	});
};

exports.detail = function(req,res){
	Money.findById(req.params.id,function(err,money){
		if(err) return next(err);
		res.jsonp(money);
	});
};

exports.update = function(req,res){
	Money.findByIdAndUpdate(req.params.id,req.body,function(err,money){
		if(err) return next(err);
		res.jsonp({result:0,money:money});
	});
};
