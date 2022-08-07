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
      ` CREATE TABLE users(id SERIAL PRIMARY KEY, Name varchar NOT NULL, Surname VARCHAR NOT NULL, email VARCHAR, cellphone VARCHAR, idno VARCHAR NOT NULL, password VARCHAR NOT NULL)`
    );
    return res;
  } catch (err) {
    throw err;
  }
}

async function addInfo(firstName, lastName, email, cellphone, idNum, password) {
  try {
    const res = await client.query(
      `INSERT INTO users(Name, Surname, email, cellphone, idno,password ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, cellphone, idNum, password]
    );
    return res;
  } catch (err) {
    throw err;
  }
}


// addInfo(
//   "kelebogile",
//   "mokwena",
//   "email",
//   "cellphone",
//   "idnum",
//   "password"
// ).then((res) => console.log(res));


module.exports = {addInfo}