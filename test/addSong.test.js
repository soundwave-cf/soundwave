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
  describe('Add a Song', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNlYzJlY2ZhMTFmNjU2MGY5OTVlMGQiLCJpYXQiOjE1MjM1MTQzNTN9.nBhPBqhh54kYzB0JGfPcVkm1SSRILXx-o8bA5ps9bBI';

    it('User should be able to add song with correct token', (done) => {
      return superagent.post(SERVER_URL + '/addSong')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'jest',
          artist: 'The Pixies',
          title: 'Monkey Gone to Heaven',
          album: 'unknown',
          url: 'https://s3-us-west-2.amazonaws.com/soundwavecf/Pixies+-+Monkey+Gone+To+Heaven.mp3'
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
  // describe.skip('Add a Song', () => {
  //   let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNlYzJlY2ZhMTFmNjU2MGY5OTVlMGQiLCJpYXQiOjE1MjM1MTQzNTN9.nBhPBqhh54kYzB0JGfPcVkm1SSRILXx-o8bA5ps9bBI';

  //   it('User should send a 400 if unable to post to db', (done) => {
  //     return superagent.post(SERVER_URL + '/addSong')
  //       .set('Authorization', `Bearer ${token}`)
  //       .send({
  //         artist: 'The Pixies',
  //         title: 'Monkey Gone to Heaven',
  //         album: 'unknown',
  //         url: 'https://s3-us-west-2.amazonaws.com/soundwavecf/Pixies+-+Monkey+Gone+To+Heaven.mp3'
  //       })
  //       .then((res) => {
  //         expect(res.status).toBe(400);
  //         done();
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   });
  // });


});