const express = require('express');

const router = express.Router();
const createCtrl = require('../controller/create.controller');
const auth = require('../middleware/authorise');

/* GET home page. */
router.post('/register', createCtrl.register);
router.post('/login', createCtrl.login);
router.get('/get', auth, createCtrl.get);
module.exports = router;
