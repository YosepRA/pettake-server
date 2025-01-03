require('dotenv').config();
require('module-alias/register');

const express = require('express');

const index = require('@Features/index/index.js');
const user = require('@Features/user/index.js');

const app = express();
const port = process.env.PORT || 3000;

/* ======================= Middlewares ======================= */

/* ======================= Routes ======================= */

app.use('/', index.router);
app.use('/user', user.router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});