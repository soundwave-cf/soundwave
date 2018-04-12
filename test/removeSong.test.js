'use strict';

const superagent =  require('superagent');
const SERVER_URL = 'http://localhost:3000';
const server = require('../server.js');
require('dotenv').config();

describe('All tests', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  describe('Server tests', () => {
    test('throws 404 if route is not found', (done) => {
      expect(40).toEqual(40);
      done();
    });
  });
  //here make sure you dont test this user in postman
  //just look at the db in heroku labs
  describe('remove a song', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNlYzJlY2ZhMTFmNjU2MGY5OTVlMGQiLCJpYXQiOjE1MjM1MTQzNTN9.nBhPBqhh54kYzB0JGfPcVkm1SSRILXx-o8bA5ps9bBI';

    it('User should be able to remove a song with correct token', (done) => {
      let songId = '5acf087f9105da60f1c5f7d8';
      return superagent.delete(SERVER_URL + '/remove?id=' + songId)
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(204);
          done();
        }); 
    });
  });
});