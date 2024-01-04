const route = require('express').Router();
const productCtrl = require('../../contoller/AdminController/ProductController');
const Product = require("../../model/Product.Model");

route.get('/addProduct', productCtrl.addProduct);

route.post('/insertProduct', Product.uploadedAvatar, productCtrl.insertProduct);
route.post('/getBtData', productCtrl.getBtData);

module.exports = route