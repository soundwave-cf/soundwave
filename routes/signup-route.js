'use strict';
// CLEAN
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/', (req, res) => {

  var myData = new User(req.body);
  myData.save()
    .then(item => {

      return res.redirect('/home.html');
      
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;  