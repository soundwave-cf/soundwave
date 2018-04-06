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

  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");

    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
module.exports = router;  