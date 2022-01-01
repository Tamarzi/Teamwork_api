const express = require('express');
const bodyparser = require('body-parser');
const router = require('./routers/router');
//const auth = require('./middlewares/');

const app = express();

app.use( bodyparser.json());
//app.use( express.json());

app.use(
  bodyparser.urlencoded({
    extended: true,			//false, check the reflection app guy
  })
)

//meant to prevent CORS errors.


app.use('/api/v1', router); // route inside this kind of file.

module.exports = app;