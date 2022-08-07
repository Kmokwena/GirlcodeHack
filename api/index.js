const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   res.send("./login.html");
// });
config.createTable();
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/login.html"));
});

//users stuff
app.post("/auth/register", (req, res) => {
  const request = req.body;
  const { username, surname, email, cellphone, idNumber, password } = request;

  console.log(request);
  config
    .addInfo(username, surname, email, cellphone, idNumber, password)
    .then((dbRes) => {
      res.send({ data: dbRes.rows });
    });
});

app.post("/auth/login", (req, res) => {
  const request = req.body;
  const { email, password } = request;


  config
    .getUserByEmailorCellphone(email, email)
    .then((dbRes) => {
      if (dbRes.rows.length === 0) {
        res.status(401).send({ error: "User not found" });
      } else {
        if (dbRes.rows[0].password === password) {
          res.send({ data: dbRes.rows });
        } else {
          res.status(401).send({ error: "Password is incorrect" });
        }
      }
    });
});



app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/register.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
