const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan')

// parse aplication/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// call routes
const routes = require('./routes');
routes(app);

// registers menu routes from index
app.use('/auth', require('./middleware'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});