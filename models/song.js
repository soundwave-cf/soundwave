'use strict';
// CLEAN
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

});


let Song = mongoose.model('Song' , song);
module.exports = {Song};

