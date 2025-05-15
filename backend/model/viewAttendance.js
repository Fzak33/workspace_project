const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewAttendance =  new Schema({
    monthlyAttendance: {
        type: Number,
        required: true
    },
  
    absentDays: {
        type: Number,
    },
   
    workingHours:[ {
        type: Date,
    }],
   

});



module.exports = viewAttendance;
