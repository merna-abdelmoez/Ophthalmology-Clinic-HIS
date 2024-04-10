const mongoose = require('mongoose');
// const slugify = require('slugify')
// const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const validator= require('validator');
const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'A user must have a name'],
        maxlength: [20, 'A user name must have less or equal then 40 characters'],
        minlength: [10, 'A user name must have more or equal then 10 characters'],
        validate: {
            validator: function(val){
                return validator.isAlpha(val.split(' ').join(''));
            },
            message: 'A doctor name must only contain characters'
        }
    },
    role: {
        type: String,
        required: [true, 'Must have a role'],
        enum: ['admin', 'doctor'],
        default:'admin' 
      },  
    email:{
        type: 'string',
        required: [true,'A doctor must have an email'],
        unique: true,
        validate: [validator.isEmail,'Please provide a valid email']
    },
    address :{
        type: 'string',
        required: [true,'A doctor must have an adress'],
    },
    phoneNumber :{
        type: 'string',
        required: [true,'A doctor must have a phone number'],
        validate: [validator.isMobilePhone,'Please provide a valid phone number']
    },
    password:{
        type: 'string',
        required: [true,'A doctor must have a password'],
        minlength: [8, 'A doctor password must have more or equal then 8 characters'],
        select: false
    },
    confirmPassword:{
        type: 'string',
        required: [true,'Please confirm your password'],
        validate:{
            validator:function(value) {
                return value ==this.password
            },
            message: 'Passwords are not the same'
        },
    },
    specialization: {
        type: String,
        required: function() { return this.role === 'doctor'; }
      },
    
});
userschema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    //when password is changed not first time make it 
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});
// userschema.methods.correctpassword =async function(canpass,userpass){
//     return await bcrypt.compare(canpass,userpass)
//   }
const User = mongoose.model('User',userschema) ;

module.exports = User;