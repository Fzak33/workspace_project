const Employee = require('../model/employee');


exports.topFiveEmployee = async (req, res, next) => {
    const {department} = req.params;
try{
    const topEmployee = await Employee.find({department: department}).sort({points:-1}).limit(5);

    return res.json(topEmployee);

}
 catch (err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
};


exports.workingHours = async (req, res, next) => {
try{
   
const {workingHours, _id} = req.body;
let employee = await Employee.findById(_id);

employee.viewAttdendance.workingHours.push(workingHours);

return res.json(workingHours);

}
 catch (err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }

};


