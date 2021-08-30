const { createPool } = require('mysql2/promise');

async function connect() {
  const connection = await createPool({
    host: '34.229.97.86',
    user: 'seokmin',
    password: '1234',
    database: 'urproject',
  });
  return connection;
}

module.exports = connect;
