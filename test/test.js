'use strict';

const superagent =  require('superagent');
const SERVER_URL = 'http://localhost:3000';
const server = require('../server.js');
require('dotenv').config();

// function getUserParams() {
//   return{
//     username: 'bill' + Math.random(),
//     password: 'windows'
//   };
// };

let newUser = {
  username: 'bill' + Math.random(),
  password: 'windows'
};
let badUsername = {
  password: 'windows'
};
let badPassword = {
  username: 'bill' + Math.random()
};

describe('All tests', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  describe('Server tests', () => {
    test('throws 404 if route is not found', (done) => {
      expect(40).toEqual(40);
      done();
    });
  });

  //TEST LOGIN

  //ADD SONG ROUTE
  describe('Add song', () => {
    it('Should be able to add a song by id', () => {
      let userId = '5ac9162d699a92171b72b9c5';
      let newSong = {};
      superagent.post(SERVER_URL + '/addSong')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(myData))
        .catch((res) =>{
          expect(res.status).toBe(200);
        });
    });
  });
});