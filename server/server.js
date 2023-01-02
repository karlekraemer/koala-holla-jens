const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5044;
let koalaRouter = require('./routes/koala.router');
let koalasLibrary = require('./routes/koalasLibrary');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/koalaRouter', koalaRouter);
app.use('/koalasLibrary', koalasLibrary);

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});




