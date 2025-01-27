const path = require('path');

const multer = require('multer');

function imageFilter(req, file, cb) {
  const extension = path.extname(file.originalname);
  const allowedImageExtensions = [
    '.png',
    '.webp',
    '.jpg',
    '.jpeg',
    '.jpe',
    '.jif',
    '.jfif',
  ];

  if (!allowedImageExtensions.includes(extension)) {
    return cb(new Error('Only images are allowed'), false);
  }

  return cb(null, true);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = path.resolve(process.cwd(), './uploads');

    return cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniquePrefix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const originalName = file.originalname.toLowerCase().replace(/\s/g, '_');

    const name = `${uniquePrefix}-${originalName}`;

    return cb(null, name);
  },
});

const multerUpload = multer({ storage, fileFilter: imageFilter });

module.exports = multerUpload;
