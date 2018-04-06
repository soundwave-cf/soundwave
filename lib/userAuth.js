'use strict';


// require('dotenv').config();



function getCred(req, res) {
  let authHeader = req.get('Authorization');
  console.log('authHeader= ', authHeader);
  if (!authHeader) {
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');
  return [username, password];
  console.log('credentials: ', username, password);
}




module.exports = { getCred };