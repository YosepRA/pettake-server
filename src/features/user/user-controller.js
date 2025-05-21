const passport = require('passport');

const { promiseResolver, includeObjectProperties } = require('@Utils/index.js');

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
      const registrationErrorResponse = {
        status: 'error',
        message: registrationError.message,
      };

      return res.json(registrationErrorResponse);
    }

    req.login(registeredUser, (loginError) => {
      if (loginError) {
        const loginErrorResponse = {
          status: 'error',
          message: loginError.message,
        };

        return res.json(loginErrorResponse);
      }

      const successfulLoginResponse = {
        status: 'ok',
        user: {
          username: registeredUser.username,
        },
      };

      return res.json(successfulLoginResponse);
    });
  },
  login(req, res) {
    const { username } = req.user;

    const successfulLoginResponse = {
      status: 'ok',
      user: {
        username,
      },
    };

    return res.json(successfulLoginResponse);
  },
  logout(req, res) {
    req.logout((error) => {
      if (error) {
        const logoutErrorResponse = {
          status: 'error',
          message: `Logout error: ${error.message}.`,
        };

        return res.json(logoutErrorResponse);
      }

      const logoutSuccessResponse = {
        status: 'ok',
      };

      return res.json(logoutSuccessResponse);
    });
  },
  getUserSession(req, res) {
    if (req.isUnauthenticated()) {
      const unauthenticatedResponse = {
        status: 'ok',
        message: null,
      };

      return res.json(unauthenticatedResponse);
    }

    const { user } = req;

    // Refresh the session.
    req.login(user, (error) => {
      if (error) {
        const loginErrorResponse = {
          status: 'error',
          message: `Session login error: ${error.message}`,
        };

        return res.json(loginErrorResponse);
      }

      const successLoginResponse = {
        status: 'ok',
        user: {
          username: user.username,
        },
      };

      return res.json(successLoginResponse);
    });
  },
  protectedRouteTest(req, res) {
    res.send('PetTake user REST API protected route test.');
  },
  getUserProfile(req, res) {
    const { user } = req;

    const userProfile = includeObjectProperties(user, [
      'username',
      'email',
      'name',
      'phone',
      'address',
    ]);

    const userProfileResponse = {
      status: 'ok',
      user: userProfile,
    };

    res.json(userProfileResponse);
  },
  async changeUserProfile(req, res) {
    const {
      user: { username },
      body: updates,
    } = req;
    const userQuery = { username };
    const updateOptions = {
      returnDocument: 'after',
    };

    const [result, updateError] = await promiseResolver(
      User.findOneAndUpdate(userQuery, updates, updateOptions),
    );

    if (updateError) {
      const updateErrorResponse = {
        status: 'error',
        message: updateError.message,
      };

      return res.json(updateErrorResponse);
    }

    const userProfile = includeObjectProperties(result, [
      'name',
      'phone',
      'address',
    ]);

    const successUserProfileUpdateResponse = {
      status: 'ok',
      user: userProfile,
    };

    return res.json(successUserProfileUpdateResponse);
  },
  async changePassword(req, res) {
    const {
      user: { username },
      body: { oldPassword, newPassword },
    } = req;

    const userQuery = { username };
    const user = await User.findOne(userQuery);

    if (user === null) {
      const userNotFoundResponse = {
        status: 'error',
        message: 'User is not found.',
      };

      return res.json(userNotFoundResponse);
    }

    const [result, changePasswordError] = await promiseResolver(
      user.changePassword(oldPassword, newPassword),
    );

    if (changePasswordError) {
      const changePasswordErrorResponse = {
        status: 'error',
        message: changePasswordError.message,
      };

      return res.json(changePasswordErrorResponse);
    }

    const successChangePasswordResponse = {
      status: 'ok',
    };

    return res.json(successChangePasswordResponse);
  },
};

module.exports = userController;
