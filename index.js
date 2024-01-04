const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const db = require('./config/mongoose');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passportLocal = require('./config/passport');
const passport = require('passport');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/assets')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(cookieParser());
app.use(session({
    name: 'Login',
    secret: 'Keyboard Cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 60 * 60 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use('/', require('./routes/AdminRoutes/AdminRoutes'));
app.use('/user', require('./routes/UserRoutes/UserRoute'));
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not conneted");
    } else {
        console.log("Server is connected on PORT:", PORT);
    }
})