const moment = require('moment');

// Every time a request is made, middleware is run
const logger = (req, res, next) => {
  // Log URL that's hit and the date
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  next();
};

module.exports = logger;