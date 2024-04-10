const mongoose = require('mongoose');
const slugify = require('slugify')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const validator= require('validator');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    data :{
        type: Date,
        required: true,
        validate:{ 
            validator:function(data){
                return data > Date.now();
            },
        }
    },
});
const Appointment = mongoose.model('Service',appointmentSchema);

module.exports = Appointment;