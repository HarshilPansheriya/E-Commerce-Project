const route = require('express').Router();
const CatCtrl = require('../../contoller/AdminController/CategoryController');
const Cat = require('../../model/Category.Model');

route.get('/addCategory', CatCtrl.addCategory);
route.post('/insertCategory', Cat.uploadedAvatar, CatCtrl.insertCategory);

module.exports = route;