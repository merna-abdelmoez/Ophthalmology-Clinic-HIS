const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login= (user) =>{
return async(req, res,next) => {
const email = req.body.email;
const password = req.body.password;
if (!email || !password){
    return res.status(404).json({
        status: 'fail',
        message: 'please enter your email and password'
    });
}
let foundUser;
if (user === 'patient') {
    foundUser = await Patient.findOne({ email: email }).select('+password');
} else if (user === 'doctor') {
    foundUser = await Doctor.findOne({ email: email }).select('+password');
} else if (user === 'admin') {
    foundUser = await Admin.findOne({ email: email }).select('+password');
}
// Handle user not found
if (!foundUser) {
    return res.status(404).json({
        status: 'fail',
        message: 'User not found'
    });
}
            // Check if the password is correct

const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
if (!isPasswordCorrect) {
    return res.status(401).json({
        status: 'fail',
        message: 'Incorrect password'
    });
}
  // If user and password are correct, proceed to the next middleware
  req.user = foundUser; 
  next();
}
}