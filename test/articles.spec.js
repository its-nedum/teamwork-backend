const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
const moment = require('moment')
const db = require('../database/dbcon')

chai.use(chaiHttp)

//Test goes here
