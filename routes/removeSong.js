'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const bearerMiddleware = require('../lib/bearerMiddleware');

router.delete('/',bearerMiddleware, (req, res) => {
  if (req.query.id) {
    Song.findOneAndRemove({_id: req.query.id})
      .then((results) => {
        res.send(204, 'song deleted');
      }); 
  }
});

module.exports = { router };