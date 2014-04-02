/**
 * ensure unique check
 * @author D.W.
 * @date 2014-4-2
 * */
'use strict';

var mongoose = require('mongoose');

exports.unique = function(req,res,next){
	// 这个函数是用来检验某一表中的字段名是否已经存在的
	var entity = req.params.entity;
	if(!(entity in mongoose.models)){
		return next(new Error('您请求了不存在的数据库集合名称,'+entity));	
	}

	var Model = mongoose.model(entity);
	var condition = {};
	condition[req.body.field] = req.body.value;
	//Model.find(condition,'_id',function(err,entities){
	//	if(err) return next(err);
	//	res.jsonp({result:entities.length});//因为0表示成功，即符合不重复的条件，所以这里面只需要返回从数据库中查找的集合的长度即可
	//});
	
	//上面4行可以有更有效的处理办法
	Model.count(condition,function(err,count){
		if(err) return next(err);
		res.jsonp({result: count});
	});
};
