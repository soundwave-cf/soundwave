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
  console.log(req.body, 'req.body is');
  Song.findOne({
    _id: req.body._id
  })
    .then((results) => {
      if (req.body.newTitle) {
        results.title = req.body.newTitle;
      }
      if (req.body.newArtist) {
        results.artist = req.body.newArtist;
      }
      if (req.body.newAlbum) {
        results.album = req.body.newAlbum;
      }
      if (req.body.newUrl) {
        results.url = req.body.newUrl;
      }
      results.save();
      console.log(results, 'am i getting the results');
    })
    .then((results) => {
      res.send(200,'Song updated successefully');
    })
    .catch((err) => {
      res.status(400).send('unable to update');
    });
});

module.exports = router;
