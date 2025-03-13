
const bcrbt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Employee = require('../model/employee');

exports.addEmployee=async(req, res, next)=> {
    try{
const errors = validationResult(req);
if (!errors.isEmpty()) {
  const errorMessages = errors.array().map((err) => err.msg).join(', ');
  const error = new Error(`Validation failed: ${errorMessages}`);
  error.statusCode = 422;
  error.data = errors.array();
  return next(error);
}
const {name,department,postion,gender } = req.body;
const email = req.body.email?.trim();
const password = req.body.password?.trim();

const existEmployee = await Employee.findOne({email: email});
const hashPass =await bcrbt.hash(password , 12);

if(existEmployee){
    const error = new Error(`email already exist`);
  error.statusCode = 422;
  return next(error);
}

let employee = new Employee({
    email:email,
    password: hashPass,
    department:department,
    gender:gender,
    postion:postion

});

employee = await employee.save();

return  res.status(200).json(employee);


}

catch{
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}

};

exports.updateEmployee=async(req, res, next)=> {
    try{
        const {department,postion } = req.body;
        const email = req.body.email?.trim();
        const employee = await Employee.findOne({email: email});
        
        if(!employee){
            const error = new Error(`there is no one with this email`);
          error.statusCode = 422;
          return next(error);
        }
        employee.department = department;
        employee.postion = postion;
        await employee.save();

        return res.json(employee);



    }
    catch{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
};

exports.getEmployees= async(reeq,res,next)=>{
try{
const employees = await Employee.find();
return res.json(employees);

}
catch{
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}
};

exports.deleteEmployees= async(reeq,res,next)=>{
    try{
        const email = req.body.email?.trim();

    const employee = await Employee.findOne({email:email});
    if(!employee){
        const error = new Error(`there is no one with this email`);
      error.statusCode = 422;
      return next(error);
    }
await Employee.findOneAndDelete({email: email});
return res.json({ message: 'User deleted successfully' });

    }
    catch{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
    };