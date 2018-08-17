const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const users = [
  {id:1, name : 'Allis'},
  {id:2, name : 'Tom'},
  {id:3, name : 'blue'},
]

app.use(logger('dev'))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('hello world'))
app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;

  const limit = parseInt(req.query.limit, 10)
  if(Number.isNaN(limit)) {
    res.status(400).end()
  } else {
    res.json(users.slice(0,limit))
  }
  
})

app.get('/users/:id', (req,res) => {
  const id = parseInt(req.params.id, 10);
  
  if(Number.isNaN(id)){
    res.status(400).end();
    return;
  }

  const user = users.filter(user => user.id === id)[0]
  if(!user) {
    res.status(404).end();
    return;
  }
  res.json(user)
})

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400).end();
    return;
  }

  const index = users.findIndex(user => {
    return user.id === id;
  })
  users.slice(index, 1)

  res.status(204).end();

})

app.post('/users', (req, res) => {
  const name = req.body.name;
  if(!name) {
    res.status(400).end();
    return;
  }

  const filtered = users.filter( user => {
    return user.name === name;
  })
  if(filtered.length > 0) {
    res.status(409).end();
    return;
  }

  const newUser = {
    "id": users.length,
    "name": name
  }
  users.push(newUser);

  res.status(201).json(newUser);

})

// 테스트하기 위해서 
module.exports = app;