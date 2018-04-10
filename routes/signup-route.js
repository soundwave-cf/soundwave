'use strict';
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');

router.get('/', (req, res) => {
  User.find()
    .then((results) => {
      res.send(results);
    });
});

router.post('/', (req, res) => {

  var myData = new User(req.body);
  // myData.hash_password = bcrypt.hashSync(req.body.password, 10);
  myData.save()
    .then(item => {
      // res.send("User Created");
      return res.redirect('/home.html');
      
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;  