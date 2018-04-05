'use strict';

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/user.js');

function getCred(req, res) {
  let authHeader = req.get('Authorization');
  console.log('authHeader= ', authHeader);
  if (!authHeader) {
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  return [username, password];
  console.log('credentials: ', username, password);
}

function bearerAuth(req, res, next) {
  if(!req.headers.authorization) {
    res.sendStatus(400);
    res.send('Not authorized');
    res.end();
  }
  let authHeader = req.headers.authorization;
  let token = authHeader.split('Bearer ')[1];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next(err);
    }
    User.findOne({ username: decoded.username })
      .then(user => {
        req.user = user;
        next();
      });
  });
}

router.get('/signin', (req, res) => {
  let [username, password] = getCred(req, res);
  User.findOne({
    username: username 
  })
    .then(user => {
      return user.comparePass(password)
        .then(results => {
          console.log('RESULTS! ', results);
          if(results) {
            res.sendStatus(200);
          }
          if(!result){
            res.sendStatus(401);
          }
        }).catch((err) => {
          res.sendStatus(401);
        });
    });
});

module.exports = { bearerAuth, getCred, router };