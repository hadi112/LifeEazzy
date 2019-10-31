/*var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
const Users = mongoose.model('User');
const usercontroller = require('../controller/user');

 methods.export={function(passport,LocalStrategy){ 
  passport.use('local',new LocalStrategy((username, password, done) => {
  Users.findOne({ username:username })
       .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }
      return done(null, user);
    }).catch(done);
}));}
}*/
var passport = require('passport');
var User=require('../models/Users');
var LocalStrategy=require('passport-local').Strategy;
var bcrypt=require('bcrypt-nodejs');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      done(err, user);
  });
});

passport.use('local',new LocalStrategy({
   passReqToCallback:true,
   usernameField:'username',
   passwordField:'password'
},
  function(req,username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!User) {
        return done(null, false); 
      }
      if (!bcrypt.compareSync(password,user.password)) { 
        return done(null, false); 
      }
      return done(null, user);
    });
  }
));