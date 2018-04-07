'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
const getCred = require('../lib/userAuth').getCred;
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');

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
          }).then((results) => {
            console.log('results: ', results._id)
            // console.log('id: ', User._id )
            Song.findOne({
              userId: results._id
            })
              .then((results) => {
                console.log('findone');
                console.log(results);
                delete results.password;
                res.send(results);
              });
          });


        }).catch((err) => {
          res.status(401);
          console.log(err);
        });
    });
});

module.exports = { router };