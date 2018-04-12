'use strict';

const superagent =  require('superagent');
const SERVER_URL = 'http://localhost:3000';
const server = require('../server.js');
require('dotenv').config();

describe('All tests', () => {
  // beforeAll(server.start);
  // afterAll(server.stop);
  // describe('Server tests', () => {
  //   test('throws 404 if route is not found', (done) => {
  //     expect(40).toEqual(40);
  //     done();
  //   });
  // });

  describe('Add a Song', () => {
    let correctToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWNlYzJlY2ZhMTFmNjU2MGY5OTVlMGQiLCJpYXQiOjE1MjM1MDYzOTN9.npnPqPt-nJnzikZLMoUMQWSxA5BvKbzW-gO6m2kr38c';

    it('User should be able to add song with correct token', (done) => {
      return superagent.post(SERVER_URL + '/addSong')
        .set('Authorization', `Bearer ${correctToken}`)
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
});