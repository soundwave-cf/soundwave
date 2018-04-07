'use strict';

const express = require('express');
const router = express.Router();
const Song = require('../models/song').Song;
const User = require('../models/user.js');
const getCred = require('../lib/userAuth').getCred;
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/create-user');


router.delete('/', (req, res) => {
    // delete one song
     if (req.query.id) {
       Song.findOneAndRemove(req.query.id)
         .then((results) => {
           console.log('SONG REMOVED!');
           res.status(204).send(results)
             .catch((err) => {
               res.err(err);
             });
         });
       // delete all songs
     } else {
       Song.remove()
         .then((results) => {
           res.status(204).send(results);
         })
         .catch((err) => {
           res.err(err);
         });
     }
    });

module.exports = { router }