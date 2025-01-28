const multer = require('multer');

const { multerUpload } = require('@Lib/multer/index.js');

function handleUpload(req, res, next) {
  multerUpload.array('images')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({
        status: 'error',
        message: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }

    return next();
  });
}

module.exports = handleUpload;
