const route = require('express').Router();
const brandCtrl = require('../../contoller/AdminController/BrandController');

route.get('/addBrand',brandCtrl.addBrand);


route.post('/insertBrand',brandCtrl.insertBrand);

module.exports = route;