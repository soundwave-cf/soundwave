'use strict';
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/create-user');

router.get('/', (req, res) => {
  User.find()
  .then((results) => {
      res.send(results);
  });
});

router.post('/', (req, res) => {
    console.log('getting here?');
    User.create(req.body) 
    .then(() => {res.sendStatus(200);
        console.log(req.body);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
module.exports = router;