const express = require('express');
// const dotenv = require('dotenv');
const app = require('./app');
require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const DB = 'mongodb+srv://zhazem:hazem1234567@cluster14.w4oofyw.mongodb.net/';
console.log(DB);


mongoose.connect(DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,

  })
  .then(() => {
    console.log('db connection successfully');
  }).catch(error => {
    console.error('🔥🔥 Error connecting to MongoDB:', error);
  });
const port = 3000 ; 
const server = app.listen (port,()=>{
    console.log(`App is running on port ${port}...`);
});
process.on('unhandledRejection', (err) => {
    console.log(err.message,err.name);
    // server.close(()=>{
    //   process.exit(1);
    // });  
    });   