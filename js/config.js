const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER || "user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "db",
  password: process.env.DB_PASS || "pass",
  port: process.env.DB_PORT || 5432,
});

client.connect();

async function createTable() {
  try {
    const res = await client.query(
      ` CREATE TABLE users(id SERIAL PRIMARY KEY, Name varchar NOT NULL, Surname VARCHAR NOT NULL, email VARCHAR, cellphone VARCHAR, idno VARCHAR NOT NULL, password VARCHAR NOT NULL, comments VARCHAR)`
    );
    return res;
  } catch (err) {
    throw err;
  }
}
