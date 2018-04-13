'use strict';

const Song = require('../models/song').Song;
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');

var data = [{
  userId: '5ac9162d699a92171b72b9c5',
  artist: 'Aaliyah',
  album: 'One in a Million',
  title: 'One in a Million',
  url: 'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F03%20One%20in%20a%20Million.mp3'
},
{
  userId: '5ac9162d699a92171b72b9c5',
  artist: 'Cake',
  album: 'Fashion Nugget',
  title: 'The Distance',
  url: 'https://s3-us-west-2.amazonaws.com/soundwavecf/02+The+Distance.m4a'

}];

var seedDb = function() {
  data.forEach(element => {
    let newSong = new Song(element);
    newSong.save();
    console.log(newSong);
  });
};

seedDb();

module.exports = { seedDb };