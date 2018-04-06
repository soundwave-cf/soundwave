
'use strict';
const User = require('./user.js');
const mongoose = require('mongoose');

const song = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  artist: String,
  title: String,
  album: String,
  url: String,
//   timestamp: true
});

const playlist = new mongoose.Schema({
  name: String,
  song: [song]
});

let Song = mongoose.model('Song' , song);
let Playlist = mongoose.model('Playlist', playlist);
module.exports = {Song, Playlist};

