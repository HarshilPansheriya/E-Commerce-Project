const route = require('express').Router();
const SubCtrl = require('../../contoller/AdminController/SubCategoryController');

route.get('/addSubCat', SubCtrl.addSubCat);
route.post('/getSubCatData',SubCtrl.getSubCatData);


route.post('/insertSubCat', SubCtrl.insertSubCat);

module.exports = route;