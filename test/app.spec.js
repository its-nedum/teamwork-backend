const { expect } = require('chai');
const app = require('../app');

describe("Teamwork Api test", () => {
    //Testing my app.js file
    describe('GET /', () => {
        it('should return Welcome to Teamwork DevC Capstone Project API', () => {
            expect('Welcome to Teamwork DevC Capstone Project').to.equal('Welcome to Teamwork DevC Capstone Project')
        })
    })
})