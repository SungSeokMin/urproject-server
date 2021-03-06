const { createPool } = require('mysql2/promise');
require('dotenv').config();

async function connect() {
  const connection = await createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  return connection;
}

module.exports = connect;
