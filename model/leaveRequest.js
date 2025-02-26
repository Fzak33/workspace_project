const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveRequest =  new Schema({
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
    },
    reason: {
        type: String,
        required: true
    },
   
    status: {
        type: String,
        required: true
    },
   

});

module.exports = leaveRequest;
