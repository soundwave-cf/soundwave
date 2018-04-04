'use strict';
var mongoose = require('mongoose');

var songSchema = new mongoose.Schema(
  {
    artist: String,
    title: String,
    album: String,
    url: String
  },
  {
    timestamps: true
  }
);

var playlist = new mongoose.Schema({
    name: String,
    songsList: SongSchema
});


var Song = mongoose.model('Song', songSchema);

module.exports = Song;
