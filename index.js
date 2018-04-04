'use strict';
const express = require('express');
const fs = require('fs');


let app = express();

let PORT = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + '/public'));

app.listen(PORT, function () {
  console.log('App listening on port 3000!');
});

