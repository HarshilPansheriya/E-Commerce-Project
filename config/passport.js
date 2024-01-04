const Admin = require('../model/Admin.Model');
const User = require('../model/User.Model');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

passport.use('admin', new passportLocal({
    usernameField: 'email',
}, async (email, password, done) => {
    let User = await Admin.findOne({ email: email })

    if (!User && !User.password == password) {
        return done(null, false);
    }
    else {
        return done(null, User);
    }
}))

passport.use('user', new passportLocal({
    usernameField: 'email',
}, async (email, password, done) => {
    let user = await User.findOne({ email: email })

    if (!user && !user.password == password) {
        return done(null, false)
    }
    else {
        return done(null, user);
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let admin = await Admin.findById(id);
    let user = await User.findById(id);
    if (admin) {
        return done(null, admin);
    }
    else if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
})

passport.setUser = async (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'Admin') {
            res.locals.admin = req.user
        } else {
            res.locals.user = req.user
        }
    }
    next();
}

passport.checkAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/user/login')
    }
}

module.exports.passport;