const route = require('express').Router();
const adminCtrl = require('../../contoller/AdminController/AdminController');
const Admin = require('../../model/Admin.Model');
const passport = require('passport');
const auth = passport.checkAuth;

//GET req
route.get('/', adminCtrl.login);
route.get('/dashboard', auth, adminCtrl.dashboard);
route.get('/addAdmin', auth, adminCtrl.addAdmin);
route.get('/showAdmin', auth, adminCtrl.showAdmin);
route.get('/logout', adminCtrl.logout)

// POST req
route.post('/insertAdmin', Admin.uploadedAvatar, adminCtrl.insertAdmin);
route.post('/checkLogin', passport.authenticate('admin', { failureRedirect: '/' }), adminCtrl.checkLogin);


// Route Imports
route.use('/category', auth, require('./CategoryRoutes'));
route.use('/subcategory', auth, require('./SubCategoryRoutes'));
route.use('/excategory', auth, require('./ExCatRoutes'));
route.use('/brand', auth, require('./BrandRoutes'));
route.use('/type', auth, require('./TypeRoutes'));
route.use('/product', auth, require('./ProductRoutes'));

module.exports = route;