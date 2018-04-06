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


router.get('/signin', (req, res) => {
  let [username, password] = getCred(req, res);
  User.findOne({
    username: username
  })
    .then(user => {
      return user.comparePass(password)
        .then(results => {


          console.log('RESULTS! ', results);
          if (!results) {
            return res.status(401);
          }
          User.findOne({
            username: username
          })
            .then((results) => {
              console.log('findone');
              delete results.password;
              res.send(results);
            });
    
        }).catch((err) => {
          res.status(401);
          console.log(err);
        });
    });
});

module.exports = { getCred, router };