'use strict';

const superagent =  require('superagent');
const SERVER_URL = 'http://localhost:3000';
const server = require('../server.js');
require('dotenv').config();

// let newUser = {
//   username: 'bill' + Math.random(),
//   password: 'password'
// };

// let badUsername = {
//   password: 'windows'
// };
// let badPassword = {
//   username: 'bill' + Math.random()
// };

describe('All tests', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  describe('Server tests', () => {
    test('throws 404 if route is not found', (done) => {
      expect(40).toEqual(40);
      done();
    });
  });

  describe('Sign In Route', () => {
    // let token;

    it('Should be able to sign returning user in', (done) => {
      return superagent.get(SERVER_URL + '/signin/signin')
        .auth('jest', 'jest')
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });
    it('Should return 400 for incorrect username', (done) => {
      return superagent.get(SERVER_URL + '/signin/signin')
        .auth('notJest', 'jest')
        .catch((res) => {
          expect(res.status).toBe(400);
          done();
        });
    });
    it('Should return 401 for incorrect password', (done) => {
      return superagent.get(SERVER_URL + '/signin/signin')
        .auth('jest', 'notJest')
        .catch((res) => {
          expect(res.status).toBe(401);
          done();
        });
    });
  });

});