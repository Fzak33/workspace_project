const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const viewAttdendance = require('./viewAttendance');
const leaveRequest = require('./leaveRequest');
const feedback = require('./feedback');

const employeeSchema =  new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   
    department: {
        type: String,
        required: true
    },
    postion: {
        type: String,
        required: true
    },
    loginCredentials: {
        type: String,
        required: true
    },

   viewAttdendance:viewAttdendance,
   leaveRequest:leaveRequest,
   feedback:feedback,
   
    role: {
        type: String,
        enum: [ 'employee' , 'manager','hr manager', 'it departement', 'top managment'],
        required: true,
        default:'employee'
    }
}, { discriminatorKey: 'role', collection: 'employee' });

const employee = mongoose.model('Employee', employeeSchema);

module.exports = mongoose.model(employee, employeeSchema);
