const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../model/employee');
require('dotenv').config();



exports.login = async (req, res, next) => {
    try {
      const email = req.body.email?.trim();
      const password = req.body.password?.trim();
  
      const employee = await Employee.findOne({ email: email });
      if (!employee) {
        const error = new Error('The email or password is incorrect');
        error.statusCode = 401;
        throw error;
      }
  
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        const error = new Error('The email or password is incorrect');
        error.statusCode = 401;
        throw error;
      }
  
      const token = jwt.sign(
        { id: employee._id },
        process.env.JWT_SECRET,
        { expiresIn: '9h' } // Token expires after 9 hours
      );
  
      console.log(token);
  
      return res.json({ token, ...employee._doc });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  