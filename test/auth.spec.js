process.env.NODE_ENV = 'test';

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
//const client = require('../database/dbcon')

chai.use(chaiHttp)

describe('Auth Route Testing', () => {
    describe('POST /auth/create-user', () => {
        it('Should create a user', (done) => {
            let newUser = {
                firstName: 'test',
                lastName: 'test1',
                email: 'oga@gmail.com',
                password: '123456',
                gender: 'female',
                jobRole: 'accountant',
                department: 'account',
                address: 'Abuja, Nigeria',
                phoneNo: '07081234567'
            };
            chai.request(app)
                .post('/api/vi/auth/create-user')
                .set('Accept', 'application/json')
                .send(newUser)
                .then((res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body.data).to.include({
                        messsage: 'User account created successfully'
                    })
                })
                .catch((err) => {
                    throw err;
                })
                done();
        })
    })

    describe('POST /auth/signin', () => {
        it('Should sign in a user', (done) => {
            let user = {
                email:'oga@gmail.com',
                password: '123456'
            };
            chai.request(app)
                .post('/api/v1/auth/signin')
                .set('Accept', 'application/json')
                .send(user)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.data).to.include({
                        token,
                        userId
                    })
                })
                .catch((err) => {
                    throw err
                })
                done();
        })
    })
})