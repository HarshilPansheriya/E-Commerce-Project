const route = require('express').Router();
const userCtrl = require('../../contoller/UserController/UserController');
const passport = require('passport');
const auth = passport.checkAuth;

route.get('/', userCtrl.dashboard);
route.get('/catFilter/:id/:sd/:ed', userCtrl.catFilter);
route.get('/product_detail/:id', userCtrl.product_detail);

route.get('/register', userCtrl.register);
route.get('/login', userCtrl.login);
route.get('/cart',auth, userCtrl.cart);

route.post('/insertUser', userCtrl.insertUser);
route.post('/checkLogin', passport.authenticate('user', { failureRedirect: '/user/login' }), userCtrl.checkLogin);
route.post('/addCart', userCtrl.addCart);
route.post('/prQuantity',userCtrl.prQuantity);

route.get('/logout', async (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return res.redirect('back')
        }
        next();
    })
    return res.redirect('/user')
})

module.exports = route;