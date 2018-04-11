'use strict';
//CLEAN
const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bearerMiddleware = require('../lib/bearerMiddleware');
require('dotenv').config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');


router.put('/', bearerMiddleware, (req, res) => {
  Song.findOne({
    title: req.body.title
  })
    .then((results) => {
      results.title = req.body.newTitle;
      results.save();
    })
    .then((results) => {
      res.send('Song updated successefully');
    })
    .catch((err) => {
      res.status(400).send('unable to update');
    });

});

module.exports = router;
