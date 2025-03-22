const express = require('express');
const authController = require('../controller/auth');

    authRt = express.Router();

    authRt.post("/login", authController.login);


    module.exports =  authRt;
