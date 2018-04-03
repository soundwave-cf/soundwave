'use strict';

const mongoose = require('mongoose');
const Song = require('/song.js');

const User = new mongoose.Schema({
  name: {
    type: String, 
    unique: true, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  playlist: [Song]
});

module.exports = mongoose.model('User', User);
