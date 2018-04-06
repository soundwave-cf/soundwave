'use strict';
const Song = require('../models/song').Song;

// console.log(Song, 'Song');
// console.log(Playlist, 'Playlist');
// const Playlist = require('../models/song');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/create-user');


var data = {
  artist: 'Aaliyah',
  album: 'One in a Million',
  title: 'One in a Million',
  url: 'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F03%20One%20in%20a%20Million.mp3'
};


var seedDb = function() {
  console.log('seeding now');
  let newSong = new Song(data);
  newSong.save()
    .then(function(newSong) {
      console.log('starting create');
      console.log(newSong);
    });
  
  // });

};

// new User(req.body);
// myData.save()
//   .then(item => {
//     res.send('item saved to database');

//   })
//   .catch(err => {
//     res.status(400).send('unable to save to database');
//   });
  
seedDb();