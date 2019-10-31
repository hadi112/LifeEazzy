const Usercontroller = require('../controller/user');
const User = require('../models/Users');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/profile',isLoggedin,function(req,res){
    res.send({msg:'profile seen || loggedin || profile page'})
});

router.use('/',notLoggedin,function(req,res){
    res.send({msg:'making sure user is logged in!!'})
});

router.get('/',(req,res)=>{
    res.send('hello world');
});

router.post('/login',passport.authenticate('local'),
    function(req,res){
        console.log(err);
        res.send('login successful');
    }
);

router.post('/register',(req,res)=>{
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        address:req.body.address,
        landmark:req.body.landmark
    });
    Usercontroller.adduser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            let message = "";
            if (err.errors.username) message = "Username is already taken. ";
            if (err.errors.email) message += "Email already exists.";
            return res.json({
                success: false,
                message
            });
        } else {
            return res.json({
                success: true,
                message: "User registration is successful."
            });
        }
    });
});


router.get('/logout',function(req,res){
    //res.send({msg:'profile logged out'})
    req.logOut();
    res.send({msg:'redirected to login page'})
});

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.send({msg:'not loggedin redirect to login page'})
    }
}

function notLoggedin(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    else{
        res.send({msg:'not loggedin redirect to login page'})
    }
}
module.exports = router;