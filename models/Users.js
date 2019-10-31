const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

const User = mongoose.model('User',userSchema);

module.exports = User;