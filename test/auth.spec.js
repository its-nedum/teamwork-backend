const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
const client = require('../database/dbcon')

chai.use(chaiHttp)

describe('Auth Route Testing', () => {
    describe('a POST request to "/auth/create-user"', () => {
      it('should ensure request is from an admin before creating a user', (done) => {
        const user = {
          firstName: 'john',
          lastName: 'doe',
          email: 'aquaman@gmail.com',
          password: 'movietinz',
          gender: 'male',
          jobRole: 'developer',
          department: 'sales',
          address: 'Abuja, Nigeria'
        };
        chai.request(app)
          .post('/api/v1/auth/create-user')
          .set('Accept', 'application/json')
          .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGFjaGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmaXNoZXJtZW4ifSwiaWF0IjoxNTczNzM4NzI3LCJleHAiOjE1NzM4MjUxMjd9.6xH-BM7L-hbhcumUItz7wHdPaiaqiOnHQ3lJexT19Lw' })
          .send(user)
          .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body.data).to.include({
              message: 'User account created successfully'
            });
            expect(res.body.errors.length).to.be.equal(0);
          })
          .catch((err) => {
            console.log(err.message);
          });
        done();
      });
    });
  
    describe('a POST request to "/auth/signin"', () => {
      it('should login a user', (done) => {
        const userInfo = {
          email: 'aquaman@gmail.com',
          password: 'movietinz'
        };
        chai.request(app)
          .post('/api/v1/auth/signin')
          .set('Accept', 'application/json')
          .send(userInfo)
          .then((res) => {
            expect(res).to.have.status(200);
          })
          .catch((err) => {
            console.log(err.message);
          });
        done();
      });
    });
  });