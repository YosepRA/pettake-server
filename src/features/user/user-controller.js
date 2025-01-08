const passport = require('passport');

const { promiseResolver } = require('@Utils/index.js');

const User = require('./user-model.js');

const userController = {
  index(req, res) {
    res.send('PetTake user REST API index.');
  },
  async register(req, res) {
    const { user } = req.body;

    const [registeredUser, registrationError] = await promiseResolver(
      User.register(user, user.password),
    );

    if (registrationError) {
      return res.json({
        status: 'error',
        message: registrationError.message,
      });
    }

    req.login(registeredUser, (loginError) => {
      if (loginError) {
        return res.json({
          status: loginError,
          message: loginError.message,
        });
      }

      return res.json({
        status: 'ok',
        user: {
          username: registeredUser.username,
        },
      });
    });
  },
  login(req, res) {
    const { username } = req.user;

    return res.json({
      status: 'ok',
      user: {
        username,
      },
    });
  },
  logout(req, res) {
    req.logout((error) => {
      if (error) {
        return res.json({
          status: 'error',
          message: `Logout error: ${error.message}.`,
        });
      }

      return res.json({
        status: 'ok',
      });
    });
  },
  getUserSession(req, res) {
    if (req.isUnauthenticated()) {
      return res.json({
        status: 'ok',
        user: null,
      });
    }

    const { user } = req;

    req.login(user, (error) => {
      if (error) {
        return res.json({
          status: 'error',
          message: `Session refresh error: ${error.message}`,
        });
      }

      return res.json({
        status: 'ok',
        user: {
          username: user.username,
        },
      });
    });
  },
  protectedRouteTest(req, res) {
    res.send('PetTake user REST API protected route test.');
  },
};

module.exports = userController;
