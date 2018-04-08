'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const getCred = require('../lib/userAuth').getCred;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');

router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.send('Must provide a username/password');
  }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      console.log(user);
      if (user === null) {
        res.send('user not found');
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        console.log('password: ', password, 'user password: ', user.password);
        if (err) {
          res.send('Authentication failed: ' + err.message);
        }

        if (!isValid) {
          res.status(401).send('Not a valid password: ' + err);
          return;
        }
        User.findOne({
          username: username
        })
          .then((results) => {
            console.log(results,'results of username');
            Song.find( {
              userId: results._id

            })
              .then((results) => {
                console.log('songs', results);
                let payload = { userId: user._id };
    
                let token = jwt.sign(payload, process.env.SECRET);
                console.log('token from /signin: ', token);
                console.log(results, 'results of song.find1');
                res.send({ auth: true, token: token , results});

              })
              .catch(err => res.send(err.message));
          });
      });
    });

  console.log('credentials:', username, password);
});


module.exports = { router };