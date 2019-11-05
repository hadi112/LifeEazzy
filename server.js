const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session');
const port = process.env.port || 5000;
var mongostore = require('connect-mongo')(session);
const flash = require('connect-flash');

//initialize them first
mongoose.set('useCreateIndex', true);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(flash());
require('../LifeEazzy/config/passport');

//Database connected
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('database connected successfully ' + config.database);
    })
    .catch(err => {
        console.log(err);
    });

//routes
const users = require('../LifeEazzy/routes/user')
app.use('/user', users);
const products = require('../LifeEazzy/routes/shoppingcart')
app.use('/shoppingcart', products);
const service = require('../LifeEazzy/routes/service');
app.use('/service',service);

//passport middleware
app.use(passport.session());
app.use(session({
    secret: 'qwerty',
    saveUninitialized: true,
    resave: false,
    store:new mongostore({ mongooseConnection:mongoose.connection }),
    cookie:{ maxAge:180*60*1000 }
}));
app.use(function(req,res){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session();
    next();
});


//port = 5000 
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});