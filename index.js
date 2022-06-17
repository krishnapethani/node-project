const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')
require('dotenv').config();
require('./app/helper/authPassport')(passport);
const logger = require('./app/helper/logging')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/', require('./app/routes/route'));
app.use(require('./app/helper/response'));
app.use(require('./app/helper/error').handleJoiErrors);
app.use(require('./app/helper/error').handleErrors);
require('./app/middleware/db');
app.use(passport.initialize());
app.use(passport.session());

module.exports=app.listen(555);
console.log('port 555 is listing');
