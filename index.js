const express = require('express');
const path = require('path');
const moment = require('moment');
const members = require('./members');

const app = express();

// Middleware
// Every time a request is made, middleware is run
const logger = (req, res, next) => {
  // Log URL that's hit and the date
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  next();
};

// Initialize middleware
app.use(logger);

// Return members JSON for get request from this route/endpoint
app.get('/api/members', (req, res) =>
  // When sending data to a web server, the data has to be a string. members variable holds a JOSn object but should be a JSON string representation. However, don't need to use JSON.stringify() when using Express; with res.json(), the conversion is done for you. It does JSON.stringify(object, replacer, space), and once this method is called, the res.json() method will then call res.send() as well, under the hood
  res.json(members));

// For static server that serves regular HTML files and CSS (although typically you won't be using Express for this, but will be building JSON APIs to connect from a front end like React or render templates in which you insert dynamic data in order to have a dynamic app rather than just a static website)
// Set static folder (use is method we use when we want to include middleware). We can put multiple HTML files and CSS in that folder and Express handles things like setting the content type and loading the files for us
app.use(express.static(path.join(__dirname, 'public')));

// When it's deployed, server probably won't run on 5000, but will have the port in an environment variable, so we should check that first, otherwise run on 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));