'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Song = require('/song.js');

const User = new mongoose.Schema({
  username: {
    type: String, 
    unique: true, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  // playlist: [Playlist]
});

//USE LATER.
User.methods.comparePass = function(password) {
  return bcrypt.compare(password, this.password);
};

User.pre('save', function(next) {
  if(this.isNew) {
    console.log('New user', this);
    bcrypt.hash(this.password, 5)
      .then(hash => {
        this.password = hash;
        next();
      }).catch(err => console.log('error', err));
  }else {
    console.log('old user', this);
    next();
  }
});

module.exports = mongoose.model('User', User);
