const express = require('express');

const router = express.Router();
const createCtrl = require('../controller/create.controller');
const auth = require('../middleware/authorise');
const upload = require('../helper/upload');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

router.post('/register', createCtrl.register);
router.post('/login', createCtrl.login);
router.get('/get', auth, createCtrl.get);
router.post('/request_reset', createCtrl.request_password_reset);
router.post('/reset_password', createCtrl.reset_password);
router.post('/upload', upload.single('image'), createCtrl.upload);

module.exports = router;
