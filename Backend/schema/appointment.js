var mongoose = require('mongoose');

var appt = new mongoose.Schema({
    doctorname: {
        type: String
    },
    speciality: {
        type: String
    },
    fee: {
        type: String
    },
    patientName: {
        type: String
    },
    age: {
        type: String
    },
    phonenumber: {
        type: String
    },
    appointmentDate: {
        type: String,
        default: Date.now()
    },

})
module.exports = mongoose.model('appointment', appt);