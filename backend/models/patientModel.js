const mongoose = require('mongoose');
const validator = require('validator');

const patientscheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [20, 'A user name must have less or equal than 20 characters'],
        minlength: [10, 'A user name must have more or equal than 10 characters'],
        validate: {
            validator: function (val) {
                return validator.isAlpha(val.split(' ').join(''));
            },
            message: 'A doctor name must only contain characters'
        }
    },
    age: {
        type: Number,
        required: [true, 'A patient must have an age'],
        validate: {
            validator: function (age) {
                return age > 0;
            }
        }
    },
    email: {
        type: String,
        required: [true, 'A patient must have an email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    address: {
        type: String,
        required: [true, 'A patient must have an address'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'A patient must have a phone number'],
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    medicalHistory: {
        type: String,
        required: [true, 'A patient must have a medical history'],
    },
});

const Patient = mongoose.model('Patient', patientscheme);

async function saveTestPatient() {
    try {
        const testPatient = new Patient({
            name: 'Hazem Zakaria',
            age: 22,
            email: 'zhazem2@gmail.com',
            address: 'Cairo',
            phoneNumber: '01000000000',
            medicalHistory: 'Healthy'
        });
        const savedPatient = await testPatient.save();
        console.log('Patient saved successfully:', savedPatient);
    } catch (error) {
        console.error('Error saving patient:', error);
    }
}

// Call the function
saveTestPatient();

module.exports = Patient;
 