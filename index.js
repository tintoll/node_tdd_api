const express = require('express')
const logger = require('morgan')
const app = express()

const users = [
  {name : 'Allis'},
  {name : 'Tom'},
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

// 테스트하기 위해서 
module.exports = app;