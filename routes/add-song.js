'use strict';
// CLEAN
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const bearerMiddleware = require('../lib/bearerMiddleware');
require('dotenv').config();

const Song = require('../models/song').Song;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');




router.post('/', bearerMiddleware, (req, res) => {
  console.log('adding song');
  console.log('req.body', req.body);
  User.findOne({
    username: req.body.username
  })
    .then((results) => {
      let myData = req.body;
      myData.userId = results._id;
      Song.create(myData);
    })
    .then(item => {
      res.send('Song Created'); 
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});
module.exports = router;

