/* eslint-disable no-tabs */
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg'
		|| file.mimetype === 'image/jpg'
		|| file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    //   fileSize should be 5 MB
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filter,
});

module.exports = upload;
