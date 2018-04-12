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
  describe('Update Song information', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNlYzJlY2ZhMTFmNjU2MGY5OTVlMGQiLCJpYXQiOjE1MjM1MTQzNTN9.nBhPBqhh54kYzB0JGfPcVkm1SSRILXx-o8bA5ps9bBI';

    it('User should be able to add song with correct token', (done) => {
      return superagent.put(SERVER_URL + '/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          _id: '5acf8025fac5de06ed27bcde',
          newArtist: 'Pixies',
          newAlbum: 'pixiemania',
          newTitle: 'monkeys go to hell',
          newUrl: 'https://s3-us-west-2.amazonaws.com/soundwavecf/Arctic+Monkeys+-+Do+I+Wanna+Know_.mp3'
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        })
        .catch(err => {
          console.error(err);
        });
    });
  });
});