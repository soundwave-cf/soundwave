'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');


router.delete('/', (req, res) => {
  // delete one song
  if (req.query.id) {
    Song.findOneAndRemove({_id: req.query.id})
      .then((results) => {
        console.log('SONG REMOVED!');
        res.status(204),
        res.send(results)
          .catch((err) => {
            res.err(err);
          });
      }); 
  }
});

module.exports = { router };