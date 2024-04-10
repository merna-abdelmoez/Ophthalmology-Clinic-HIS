const express = require('express');
const app = express();

app.use(express.json());

console.log("Middleware should be executed before this line.");

app.use((req, res, next) => {
  console.log('Hello, world from Middleware!');
  console.log(req.headers);
  next();
}); 

const patientRouter = require('./routes/patientRoutes');
const doctorRouter = require('./routes/userRoutes');

app.use('/api/v1/patients', patientRouter);
// app.use('/api/v1/doctors', doctorRouter);

module.exports = app;
