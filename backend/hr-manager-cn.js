
const bcrbt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Employee = require('../model/employee');
const Request = require('../model/leaveRequest');
const Event = require('../model/event');

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
const {name,department,position,gender , salary , phoneNumber} = req.body;
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
  phoneNumber:phoneNumber,
  salary:salary,
    email:email,
    password: hashPass,
    department:department,
    gender:gender,
    postion:position,
  name:name
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
        const {department,postion,salary } = req.body;
        const email = req.body.email?.trim();
        const employee = await Employee.findOne({email: email});
        
        if(!employee){
            const error = new Error(`there is no one with this email`);
          error.statusCode = 422;
          return next(error);
        }
        employee.department = department;
        employee.postion = postion;
        employee.salary = salary;

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

exports.getEmployees= async(req,res,next)=>{
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

exports.deleteEmployees= async(req,res,next)=>{
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


    exports.getReq= async(req,res,next)=>{
      try{
        const request = await Request.find();
        return res.json(request);

      }
      catch{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
    };


    // email, status{true or false}, id => update req  => endDate => date.now

    exports.statusOfReq= async(req,res,next)=>{
      try{
        const{status ,_id} = req.body;
        var request = await Request.findById(_id);
        if(!request){
          const error = new Error(`there is no request with this id`);
        error.statusCode = 422;
        return next(error);
      }

      request.status = status;
      request.endDate = Date.now();

      return res.json(request);
        
      }
      catch{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
    };
    
    exports.getEvent= async(req,res,next)=>{

      try{

        const event = await Event.find();
        return res.json(event);
      }
      catch{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }


    };

    exports.addEvent= async(req,res,next)=>{

      try{
        const {employeeEmail, eventType,eventTime} = req.body;

        if(!eventTime , !eventType, !employeeEmail){
          const error = new Error(`please phil the rest of the data`);
        error.statusCode = 422;
        return next(error);
        }
        
        const event = new Event(

          {employeeEmail: employeeEmail
          , eventType: eventType
          ,eventTime: eventTime
        
        }
        );
        event = await event.save();
        return res.json(event);

      }
      catch{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }


    };