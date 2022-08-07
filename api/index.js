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
app.post("/users/register", (req, res) => {
  const request = req.body;
  const { username, surname, email, cellphone, idNumber, password } = request;

  console.log(request);
  config
    .addInfo(username, surname, email, cellphone, idNumber, password)
    .then((dbRes) => {
      res.send({ data: dbRes.rows });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
