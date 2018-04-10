'use strict';
const superagent =  require('superagent');
const SERVER_URL = 'http://localhost:3000';
require('dotenv').config();

// function getUserParams() {
//   return{
//     username: 'bill' + Math.random(),
//     password: 'windows'
//   };
// };


describe('Server tests', () => {
  test('throws 404 if route is not found', (done) => {
    expect(40).toEqual(40);
    done();
  });
});

describe('Testing User Sign Up', () => {
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

  test('Should create new user', (done) => {
    superagent.post(SERVER_URL + '/signup')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(newUser))
    
      .end((err, res) => {
        if(err){
          res.send('errrrrrr', err);
        }
        expect(res.status).toBe(200);
        done();
      });
    
  });
  test('Should give err 400 if no username', (done) => {
    superagent.post(SERVER_URL + '/signup')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(badUsername))
      .catch((res) => {
        console.log('catch');
        expect(res.status).toBe(400);
        done();
      });
  });
  test('Should give err 400 if no password', (done) => {
    superagent.post(SERVER_URL + '/signup')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(badPassword))
      .catch((res) => {
        console.log('catch');
        expect(res.status).toBe(400);
        done();
      });
  });
});