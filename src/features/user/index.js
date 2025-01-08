const router = require('./user-router.js');
const model = require('./user-model.js');
const seeder = require('./user-seeder.js');
const protectRoute = require('./middlewares/protect-route.js');
const authenticateLogin = require('./middlewares/authenticate-login.js');

module.exports = {
  router,
  model,
  seeder,
  middlewares: {
    protectRoute,
    authenticateLogin,
  },
};
