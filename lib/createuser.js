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
  if (req.body.username === null) {
    res.status(400);
    res.send('Username is not defined');
  }
  if (req.body.password === null) {
    res.status(400);
    res.send('Password is not defined');
  }
  User.create(req.body)
    .then(() => {
      res.sendStatus(200);
      console.log(req.body);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
module.exports = router;