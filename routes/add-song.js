'use strict';
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

const Song = require('../models/song').Song;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');

// var id;

// function findId(data) {
//   User.findOne({
//     username: data.username
//   });
//     // .then((results) => {
//     //   id = results._id;
//     //   console.log('1st id', id);
//     // });

// }

router.get('/', (req, res) => {
  Song.find().then(songs => res.send(songs));
});

router.get('/test-song', (req, res) => {
  Song.create({
    artist: 'other',
    album: 'other',
    title: 'other',
    url: 'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F03%20One%20in%20a%20Million.mp3',
    userId: '5ac9162d699a92171b72b9c5'
  })
    .then((song) => {
      res.send(song);
    });
});

router.post('/', (req, res) => {
  console.log('adding song');
  console.log('req.body', req.body);
  User.findOne({
    username: req.body.username
  })
    .then((results) => {
      console.log('id', results._id);
      // let newBody = function (data, results) {
      //   data.userId = results._id;
      // };


      console.log('reqbody', req.body);
      let myData = req.body;
      console.log('mydata', myData);
      myData.userId = results._id;
      // myData = new Song(myData);
      
      // console.log('mydata',myData);
      // return myData.save();
      Song.create(myData);
    })
    .then(item => {
      
      res.send("User Created"); 
      // return res.redirect('/home.html');

    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});
module.exports = router;