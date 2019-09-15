require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
//const tickets = require('./tickets')
const ticketsRouter = require('./tickets/tickets-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common'

app.use(morgan('combined', morganOption))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})

app.use('/api/tickets', ticketsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      console.error(error)
      response = { error: error.message, object: error }
    }
    res.status(500).json(response)
  })

module.exports = app