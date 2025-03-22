const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewAttendance =  new Schema({
    monthlyAttendance: {
        type: String,
        required: true
    },
    dateRangeFilter: {
        type: String,
        required: true,
    },
    absentDays: {
        type: Number,
    },
   
    workingHours: {
        type: Number,
        default:0
    },
   

});

module.exports = viewAttendance;
