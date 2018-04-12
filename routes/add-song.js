'use strict';
// CLEAN
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Song = require('../models/song').Song;

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
      res.send(200, 'Song Created'); 
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

module.exports = router;

