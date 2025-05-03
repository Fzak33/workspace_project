const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const hrMangRoute = require('./routes/hr-manager-rt');
const authRoute = require('./routes/auth-rt');

const path = require('path');
require('dotenv').config();
  

const MONGODB_URI =
  process.env.MONGO_URI;


const PORT =process.env.PORT || 3000;




const app = express(); 



app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // اسمح لكل المصادر تتصل
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // حدد الميثودات المسموحة
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // السماح بالهيدر مثل التوكين
  next();
});

app.use('/hr-manager',hrMangRoute);
app.use('/auth',authRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ message });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("conect  succsse");

  const server =  app.listen(PORT, () => {
  console.log(`connected at port ${PORT}`);

});
 
  })
  .catch((e) => {
    console.log(e);
  });

