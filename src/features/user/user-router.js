const express = require('express');

const controller = require('./user-controller.js');
const authenticateLogin = require('./middlewares/authenticate-login.js');
const protectRoute = require('./middlewares/protect-route.js');

const router = express.Router();

router.use(express.json());

/* ======================= Routes ======================= */

router.get('/', controller.index);

router.post('/register', controller.register);

router.post('/login', authenticateLogin, controller.login);

router.post('/logout', controller.logout);

router.get('/get-user-session', controller.getUserSession);

router.get('/protected', protectRoute, controller.protectedRouteTest);

module.exports = router;
