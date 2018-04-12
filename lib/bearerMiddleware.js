'use strict';
//CLEAN

const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let token = authHeader.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    
    if (err) {
      console.log('ERR= ', err);
      res.send(err.message);
    }
    console.log('DECODED= ', decoded);
    User.findOne({ _id: decoded.userId })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
};