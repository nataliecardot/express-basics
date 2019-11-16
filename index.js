const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

// Initialize middleware
// app.use(logger);

// Handlebars middleware
// Note: Typically you'll EITHER be building an API so you can have React, Vue, etc., on the front end, and you're just serving JSON, or you'll have a complete server-side app where you use templates
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
// For handling form submissions
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}));

// For static server that serves regular HTML files and CSS (although typically you won't be using Express for this, but will be building JSON APIs to connect from a front end like React or render templates in which you insert dynamic data in order to have a dynamic app rather than just a static website)
// Set static folder (use is method we use when we want to include middleware). We can put multiple HTML files and CSS in that folder and Express handles things like setting the content type and loading the files for us
// Because this is below homepage route, this isn't showing
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

// When it's deployed, server probably won't run on 5000, but will have the port in an environment variable, so we should check that first, otherwise run on 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));