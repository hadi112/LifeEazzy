const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const getuser = function(){
    
}

const adduser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

const verifyPassword = (verifyPassword, hash, callback) =>{
    bcrypt.compare(verifyPassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
module.exports = {
    adduser,
    verifyPassword
}