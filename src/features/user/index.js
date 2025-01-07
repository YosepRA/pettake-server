const router = require('./user-router.js');
const model = require('./user-model.js');
const seeder = require('./user-seeder.js');
const isLoggedIn = require('./middlewares/is-logged-in.js');
const authenticateLogin = require('./middlewares/authenticate-login.js');

module.exports = {
  router,
  model,
  seeder,
  middlewares: {
    isLoggedIn,
    authenticateLogin,
  },
};
