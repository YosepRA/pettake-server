const express = require('express');

const controller = require('./image-controller.js');
const handleUpload = require('./middlewares/handle-upload.js');

const router = express.Router();

/* ======================= Routes ======================= */

router.get('/', controller.index);

router.post('/', handleUpload, controller.create);

router.delete('/', express.json(), controller.remove);

module.exports = router;
