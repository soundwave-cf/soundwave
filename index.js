'use strict';
const express = require('express');
const fs = require('fs');
const router = require('./routes/routes');


let app = express();

let PORT = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + '/public'));

app.use('/songs', router);

app.listen(PORT, function () {
  console.log('App listening on port 3000!');
});

