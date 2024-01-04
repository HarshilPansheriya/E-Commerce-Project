const route = require('express').Router();
const ExCat = require('../../contoller/AdminController/ExCatController');

route.get('/addExCat', ExCat.addExCat);

route.post('/insertExCat', ExCat.insertExCat);
route.post('/getexCatData', ExCat.getexCatData);


module.exports = route;