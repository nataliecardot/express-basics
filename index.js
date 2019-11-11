const express = require('express');

const app = express();

// Route/endpoint (for get requests, the type of request when you go to a webpage)
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


// When it's deployed, server probably won't run on 5000, but will have the port in an environment variable, so we should check that first, otherwise run on 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));