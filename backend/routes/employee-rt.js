const express = require('express');
const employeeController = require('../controller/employee-cn');
const isEmployee = require('../middleware/is-auth');

    employeeRoute = express.Router();

    // employeeRoute.get('/top-five-employee/:department', isEmployee , employeeController.topFiveEmployee);

    employeeRoute.get('/top-five-employee/:department' , employeeController.topFiveEmployee);

    // employeeRoute.post('/working-hours', isEmployee , employeeController.topFiveEmployee);

    employeeRoute.post('/working-hours' , employeeController.topFiveEmployee);


  module.exports =  employeeRoute;

