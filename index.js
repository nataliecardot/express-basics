const express = require('express');
const path = require('path');

const app = express();

// For static server that serves regular HTML files and CSS
// Set static folder (use is method we use when we want to include middleware). We can put multiple HTML files and CSS in that folder and Express handles things like setting the content type and loading the files for us
app.use(express.static(path.join(__dirname, 'public')));

// When it's deployed, server probably won't run on 5000, but will have the port in an environment variable, so we should check that first, otherwise run on 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));