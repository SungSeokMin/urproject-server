const { createPool } = require('mysql2/promise');

async function connect() {
  const connection = await createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'urproject',
  });
  return connection;
}

module.exports = connect;
