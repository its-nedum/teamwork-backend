const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const {should, expect} = chai
const db = require('../database/dbcon')
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

//Test goes here
