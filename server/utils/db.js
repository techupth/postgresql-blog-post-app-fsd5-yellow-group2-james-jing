// Creating PostgreSQL Client here
const { Client, Pool } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});


export Pool;