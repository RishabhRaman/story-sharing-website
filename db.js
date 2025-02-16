const oracledb = require('oracledb');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING, // Example: 'localhost/XE' or 'yourdb_high'
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
    console.log("✅ Connected to Oracle Database");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
  }
}

async function executeQuery(query, binds = [], options = { autoCommit: true }) {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, binds, options);
    return result;
  } catch (err) {
    console.error("❌ Query Execution Error:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("❌ Error closing connection:", err);
      }
    }
  }
}

module.exports = { initialize, executeQuery };
