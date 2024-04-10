const Patient = require('../models/patientModel');

exports.getAllPatients = async (req, res, next) => {
    const patients = await Patient.find();
    res.status(200).json({
        status: 'success',
        data: {
            patients
        }
    });
};
