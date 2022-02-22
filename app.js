const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const multer = require('multer');
const MongoDB = require('./utils/mongo.config');
const indexRouter = require('./routes/create');

const { PORT } = process.env;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.listen(PORT, async () => {
  await MongoDB();
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
