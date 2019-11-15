const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
const db = require('../database/dbcon')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

//Test goes here
describe("Gif Route Testing", () => {
    
    
  // GET - List all gifs
  it('should return all gifs', () => {
    return chai.request(app)
      .get('/api/v1/gifs')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGFjaGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmaXNoZXJtZW4ifSwiaWF0IjoxNTczNzM4NzI3LCJleHAiOjE1NzM4MjUxMjd9.6xH-BM7L-hbhcumUItz7wHdPaiaqiOnHQ3lJexT19Lw'})
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
      })
  
  });
})