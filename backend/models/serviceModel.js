const mongoose = require('mongoose');
// const slugify = require('slugify')
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
const validator= require('validator');
 
const serviceschema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'A service must have a name'],
    },
    cost:{
        type: Number,
        required: [true,'A service must have a cost'],
        validate:{
            validators:function(cost){
                return cost > 0;
            }
        }
    },
    description:{
        type: String,
        required: [true,'A service must have a description'],
    },
});
const Service = mongoose.model('Service',serviceschema);
module.exports = Service;