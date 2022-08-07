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
      ` CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, Name varchar NOT NULL, Surname VARCHAR NOT NULL, email VARCHAR, cellphone VARCHAR, idno VARCHAR NOT NULL, password VARCHAR NOT NULL)`
    );
    return res;
  } catch (err) {
    throw err;
  }
}

async function addInfo(firstName, lastName, email, cellphone, idNum, password) {
  try {
    console.log("here");
    const res = await client.query(
      `INSERT INTO users(Name, Surname, email, cellphone, idno,password ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, cellphone, idNum, password]
    );
    return res;
  } catch (err) {
    throw err;
  }
}

// async function getUserByCellphone(cellphone) {
//   try {
//     const res = await client.query(
//       `SELECT * FROM users WHERE cellphone = $1`,
//       [cellphone]
//     );
//     return res;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getUserByEmail(email) {
//   try {
//     const res = await client.query(
//       `SELECT * FROM users WHERE email = $1`,
//       [email]
//     );
//     return res;
//   } catch (err) {
//     throw err;
//   }
// }

async function getUserByEmailorCellphone(email, cellphone) {
  try {
    const res = await client.query(
      `SELECT * FROM users WHERE email = $1 OR cellphone = $2`,
      [email, cellphone]
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

module.exports = { addInfo, createTable, getUserByEmailorCellphone };
