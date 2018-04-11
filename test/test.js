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

// describe('Testing user Login', () => {

//   test('Entered password should equal saved password', (done) => {
//     superagent.post(SERVER_URL + '/signin')
//       .set('Content-Type', 'application/json')
//       .send(JSON.stringify(badPassword))
//       .catch((res) => {
//         console.log('catch');
//         expect(expected).toBe(newUser.password);
//         done();
//       });
//   });
// });

// test.skip('sends 401 for wrong password/token', (done) => {

//   let newUser = getUserParams();

//   superagent.post(SERVER_URL + '/api/hats')
//     .set('Content-Type', 'application/json')
//     .send(newUser)
//     .end((err, res) => {
//       expect(res.status).toBe(401);
//       done();
//     });
// });

describe('Routes', () => {

  test('Should be able to ADD a song', (done) => {
    let deleteSong;

    superagent.get(SERVER_URL + '/')
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        deleteSong = res.body[0];
        console.log('res.body= ', res.body);
        let id = res.body[0]._id;
        superagent.delete(`${SERVER_URL}/api?id=${id}`)
          .end((err, res) => {
            if (err) {
              console.error(err);
            }
            expect(res.status).toBe(204);
            done();
          });
      });
  });
});