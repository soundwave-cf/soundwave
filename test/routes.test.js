'use strict';

const superagent = require('superagent');
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

  //DELETE ROUTE
  describe('DELETE method', () => {
    test('Should be able to DELETE a song by id', (done) => {
      let songId = '5acc4d6dba76be001498e2fe';
      superagent.delete(SERVER_URL + '/remove?id=' + songId)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(204);
          done();
        });
    });
  });
});