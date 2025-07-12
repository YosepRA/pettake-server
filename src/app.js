require('dotenv').config();
require('module-alias/register');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');

const index = require('@Features/index/index.js');
const user = require('@Features/user/index.js');
const image = require('@Features/image/index.js');
const mongoConnect = require('@Database/mongo-connect.js');
const { startApolloServer, resolveContext } = require('@GraphQL/index.js');
const passportLib = require('@Lib/passport/index.js');
const cloudinaryLib = require('@Lib/cloudinary/index.js');

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
  store: MongoStore.create({ mongoUrl, ttl: 3 * 24 * 60 * 60 }),
};

const corsConfig = {
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [],
  credentials: true,
};

/* ======================= Database Connection ======================= */

const db = mongoConnect(mongoUrl);

/* ======================= GraphQL and Server Initialization ======================= */

startApolloServer().then((graphQLServer) => {
  /* ======================= Middlewares ======================= */

  app.use(logger('dev'));
  app.use(session(sessionConfig));
  app.use(cors(corsConfig));

  /* ======================= Start Passport ======================= */

  passportLib.start(app);

  /* ======================= Start Cloudinary ======================= */

  cloudinaryLib.start();

  /* ======================= Routes ======================= */

  app.use('/', index.router);
  app.use('/user', user.router);
  app.use('/image', image.router);
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(graphQLServer, { context: resolveContext }),
  );

  app.listen(port, () => {
    console.log(`Server is listening on port ${port} ...`);
  });
});
