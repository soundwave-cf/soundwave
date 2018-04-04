'use strict';
const express = require('express');
const router = express.Router();
router.get('/', function (req, res) {

  return res.redirect('/public/home.html');
  
});
  
router.get('/music', function (req, res) {
  
  let fileId = req.query.id;
  let file = __dirname + '/music/' + fileId;
  fs.exists(file, function (exists) {
    if (exists) {
      let rstream = fs.createReadStream(file);
      rstream.pipe(res);
    }
    else {
      res.send('Its a 404');
      res.end();
    }
  
  });
});
module.exports = router;