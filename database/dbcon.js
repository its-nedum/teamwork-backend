const {Client} = require('pg');

//Connecting API to Postgres Database
const conString = process.env.HEROKU_DB_URI || "postgres://devc:123456@localhost:5432/teamwork";
const client = new Client(conString);
client.connect();

module.exports = client;