'use strict';
// CLEAN
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');

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
});



User.pre('save', function(next) {
  if(this.isNew) {
    console.log('New user', this);
    bcrypt.hash(this.password, 10)
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
