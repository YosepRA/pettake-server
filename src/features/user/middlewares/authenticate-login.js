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

    req.login(user, (error) => {
      if (error) {
        return res.json({
          status: 'error',
          message: `Session creation error: ${error.message}.`,
        });
      }

      const { rememberMe } = req.body;

      if (rememberMe) {
        req.session.cookie.maxAge = 3 * 24 * 60 * 60 * 1000;
      }

      return next();
    });
  })(req, res, next);
}

module.exports = authenticateLogin;
