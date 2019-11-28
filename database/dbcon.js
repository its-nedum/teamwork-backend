const {Client} = require('pg');

//Connecting API to Postgres Database
//const conString = process.env.DATABASE_URL || process.env.LOCAL_DB_URL;
const conString = process.env.LOCAL_DB_URL;
const client = new Client(conString);
client.connect();

module.exports = client;