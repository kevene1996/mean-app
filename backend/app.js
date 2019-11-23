const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('first');
  next();
})

app.use((req, res, next) => {
  res.send('hello from express');
})

module.exports = app;  // exports all variables and functions in 'app'
