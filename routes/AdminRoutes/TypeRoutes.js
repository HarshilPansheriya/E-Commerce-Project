const route = require('express').Router();
const typeCtrl = require('../../contoller/AdminController/TypeController');

route.get('/addType', typeCtrl.addType);

route.post('/insertType',typeCtrl.insertType);

module.exports = route;