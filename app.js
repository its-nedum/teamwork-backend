const express = require('express');
const bodyParser = require('body-parser');
//require('dotenv').config();
require('dotenv-extended').load()
const app = express();

//Setup body-parser middleware
app.use(bodyParser.json());

//CORS - This allows access from different origin to my API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//My app.js test script
app.get('/', (req, res) => {
  res.send('Welcome to Teamwork DevC Capstone Project');
});

//Setup our Auth Router
const authRouter = require('./routes/auth');
app.use('/api/v1/auth', authRouter );

//Route guard with JSONWEBTOKEN
const authenticate = require('./middleware/authenticate')

//Setup our Article Router
const articleRouter = require('./routes/articles');
app.use('/api/v1', authenticate, articleRouter );

//Setup our Gif Router
const gifRouter = require('./routes/gifs');
app.use('/api/v1', authenticate, gifRouter );

module.exports = app;