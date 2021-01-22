const express = require('express');
const bodyParser =  require('body-parser');
const app = express();

// parse aplication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// call routes
const routes = require('./routes');
routes(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});