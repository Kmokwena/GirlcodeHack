const express = require('express')
const bodyParser = require('body-parser');
const config = require('./config');

config.createTable()
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//users stuff
app.post('/users/register', (req, res) => {
  const request = req.body;
  const {
    username,
    surname,
    email,
    cellphone,
    idNumber,
    password,

  } = request

  console.log(request)
  config.addInfo(username, surname, email, cellphone, idNumber, password).then(dbRes=>{
    res.send({data: dbRes.rows})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})