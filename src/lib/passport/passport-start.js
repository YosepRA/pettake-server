const passport = require('passport');

const { model: User } = require('@Features/user/index.js');

function passportStart(app) {
  /* ======================= Passport Configuration ======================= */

  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  /* ======================= Middleware Initialization ======================= */

  app.use(passport.initialize());
  app.use(passport.session());

  return passport;
}

module.exports = passportStart;
