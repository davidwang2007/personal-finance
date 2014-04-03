'use strict';
var moneys = require('../controllers/moneys.js');

module.exports = function(app,passport){
	app.get('/money',moneys.list);
	app.get('/money/:id',moneys.detail);
	app.post('/money',moneys.create);
	app.put('/money/:id',moneys.update);
	app.delete('/money/:id',moneys.remove);
};
