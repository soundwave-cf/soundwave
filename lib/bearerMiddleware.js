'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let token = authHeader.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.send(400, err.message);
    }
    User.findOne({ _id: decoded.userId })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
};