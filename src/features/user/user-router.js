const express = require('express');

const controller = require('./user-controller.js');

const router = express.Router();

/* ======================= Routes ======================= */

router.get('/', controller.index);

router.post('/register', controller.register);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.get('/get-user-session', controller.getUserSession);

router.get('/protected', controller.protectedRouteTest);

module.exports = router;
