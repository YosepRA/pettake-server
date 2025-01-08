require('dotenv').config();
require('module-alias/register');

const express = require('express');
const session = require('express-session');
const logger = require('morgan');

const index = require('@Features/index/index.js');
const user = require('@Features/user/index.js');
const mongoConnect = require('@Database/mongo-connect.js');
const passportLib = require('@Lib/passport/index.js');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/PetTake';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  console.log(
    'You are using an unsafe session secret. Please provide application with safe secret using environemnt variable "SESSION_SECRET".',
  );

  sessionSecret = 'unsafe_session_secret';
}

const sessionConfig = {
  secret: sessionSecret,
  saveUninitialized: false,
  resave: false,
};

/* ======================= Database Connection ======================= */

const db = mongoConnect(mongoUrl);

/* ======================= Middlewares ======================= */

app.use(logger('dev'));
app.use(session(sessionConfig));

/* ======================= Passport Initialization ======================= */

passportLib.start(app);

/* ======================= Routes ======================= */

app.use('/', index.router);
app.use('/user', user.router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});
