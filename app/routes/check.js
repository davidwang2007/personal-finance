'use strict';

var check = require('../controllers/check');

module.exports = function(app,passport){
	// 判断某一实体类是否在数据库中是惟一的
	app.post('/api/check/:entity',check.unique);
};
