/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');
const Token = require('../models/token.model');
const Mail = require('../helper/sendMail');
// console.log({ tokenSecretKey });

module.exports = {
  register: async (req, res) => {
    try {
      const {
        firstname, lastname, email, password,
      } = req.body;
      // Hash password and Salt Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      // Token Secret Key
      const tokenSecretKey = process.env.JWT_SECRET;
      // Data to be
      const data = { _id: user._id };
      // Token Expiration Time
      const tokenExpirationTime = process.env.JWT_EXPIRATION_TIME;

      // Create a token
      const token = jwt.sign(data, tokenSecretKey, {
        expiresIn: tokenExpirationTime,
      });

      if (!user) return res.status(400).json({ result: 'User Not Created' });
      return res.status(200).json({ result: user, token });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('Email Not Found, Please Register');
      }
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res
          .status(400)
          .json({ result: 'Bobo Wrong Password, Shine youe eye well' });
      }
      // Token Secret Key
      const tokenSecretKey = process.env.JWT_SECRET;
      // Data to be
      const data = { _id: user._id };
      // Token Expiration Time
      const tokenExpirationTime = process.env.JWT_EXPIRATION_TIME;

      // Create a token
      const token = jwt.sign(data, tokenSecretKey, {
        expiresIn: tokenExpirationTime,
      });

      return res.status(200).json({ result: 'Welcome to our platform', token });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  get: async (req, res) => {
    const user = await User.findById({ _id: req.user._id });
    return res.status(200).json({ data: `Hello ${user.firstname} Welcome Back` });
  },
  request_password_reset: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ result: 'Email Not Found, try to register' });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      const hash = await bcrypt.hash(resetToken, 10);
      await Token.create({
        userId: user._id,
        token: hash,
      });

      const url = `http://localhost:3000/reset_password/?userId=${user._id}&resetToken=${resetToken}`;

      // Send Reset Password url to user
      await Mail(
        email,
        'Reset Password',
        `<a href="${url}">Reset Password</a>`,
      );

      return res.status(200).json({ result: 'Email Sent' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  reset_password: async (req, res) => {
    try {
      const { userId, resetToken, password } = req.body;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ result: 'User Not Found' });

      const token = await Token.findOne({ userId });
      if (!token) return res.status(404).json({ result: 'Token Not Found' });

      const isValid = await bcrypt.compare(resetToken, token.token);
      if (!isValid) return res.status(404).json({ result: 'Token Not Valid or Expired' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      await user.save();

      // Delete Token
      token.remove();

      return res.status(200).json({ result: 'Password Reset Successfully' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
