'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');

router.delete('/', (req, res) => {
  if (req.query.id) {
    Song.findOneAndRemove({_id: req.query.id})
      .then((results) => {
        console.log('SONG REMOVED!');
        res.status(204).send(results)
          .catch((err) => {
            res.err(err);
      });
    }); 
  }
});

module.exports = { router };