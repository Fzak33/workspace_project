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
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
   
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    loginCredentials: {
        type: String,
    },
    salary:{
        type:Number,
        required: true,
    },
   status: {
type: Number,
default:0
    },

   viewAttdendance:viewAttdendance,
   leaveRequest:leaveRequest,
   feedback:feedback,
   
    role: {
        type: String,
        enum: [ 'employee' , 'manager','hr manager', 'it departement', 'top managment'],
        required: true,
        default:'employee'
    },
    gender: {
        type: String,
        enum: [ 'Male','Female'],
        required: true,
    }
}, { discriminatorKey: 'role', collection: 'employee' });

const employee = mongoose.model('Employee', employeeSchema);

module.exports = employee;
