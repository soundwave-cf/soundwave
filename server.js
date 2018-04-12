'use strict';

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const createuser = require('./routes/signup-route');
const bodyParser = require('body-parser');
const userAuth = require('./routes/signin-route');
const removeSong = require('./routes/removeSong');
// leave for now
// const seedDb = require('./lib/seedDb.js');
const addSong = require('./routes/add-song');
const update = require('./routes/update');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));
app.use('/signup', createuser);
app.use('/signin', userAuth.router);
app.use('/addSong', addSong);
app.use('/remove', removeSong.router);
app.use('/update', update);

app.get('/', function (req, res) {
  return res.redirect('/home.html');
});

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
// Server Controls
const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server Error. Server already running.'));
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server Error. Server already stopped.'));
    server.http.close(() => {
      server.isOn = false;
      mongoose.disconnect();
      return resolve();
    });
  });
};

