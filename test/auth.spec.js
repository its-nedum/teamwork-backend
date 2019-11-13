const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
const client = require('../database/dbcon')

chai.use(chaiHttp)

