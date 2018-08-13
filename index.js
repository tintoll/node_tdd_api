const express = require('express')
const logger = require('morgan')
const app = express()

const users = [
  {id:1, name : 'Allis'},
  {id:2, name : 'Tom'},
  {id:3, name : 'blue'},
]

app.use(logger('dev'))

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
  const user = users.filter(user => user.id === id)[0]
  res.json(user)
})

// 테스트하기 위해서 
module.exports = app;