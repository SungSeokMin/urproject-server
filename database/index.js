const { createPool } = require('mysql2/promise');

async function connect() {
  const connection = await createPool({
    host: '3.95.14.52',
    user: 'seokmin',
    password: '1234',
    database: 'urproject',
  });
  return connection;
}

module.exports = connect;
