'use strict';

const mongoose = require('mongoose');

const Song = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.OjectId,
    ref: 'User'
  },
  artist: String,
  title: String,
  album: String,
  url: String,
  timestamps: true
});

module.exports = mongoose.model('Song', Song);
