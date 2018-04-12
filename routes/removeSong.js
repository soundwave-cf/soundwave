'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
const bearerMiddleware = require('../lib/bearerMiddleware');


router.delete('/',bearerMiddleware, (req, res) => {
  if (req.query.id) {
    Song.findOneAndRemove({_id: req.query.id})
      .then((results) => {
        console.log('SONG REMOVED!');
        res.send(204, results);
        // .catch((err) => {
        //   res.err(err);
        // });
      }); 
  }
});

module.exports = { router };