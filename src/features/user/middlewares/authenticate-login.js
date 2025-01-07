const passport = require('passport');

function authenticateLogin(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.sendStatus(500);
    }

    if (!user) {
      const { message } = info;

      return res.json({
        status: 'error',
        message,
      });
    }

    return next();
  })(req, res, next);
}

module.exports = authenticateLogin;
