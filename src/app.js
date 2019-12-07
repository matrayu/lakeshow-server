require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const ticketsRouter = require('./tickets/tickets-router')
const adminRouter = require('./admin/admin-router')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const paymentRouter = require('./payment/payment-router')
const forgotPasswordRouter = require('./password/forgotPassword-router')
const mailjet = require('./email/email-router')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common'

app.use(morgan('combined', morganOption))
app.use(cors())
app.use(helmet())

app.use('/api/tickets', ticketsRouter)
app.use('/api/admin', adminRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/pay', paymentRouter)
app.use('/api/send_email', mailjet)
app.use('/api/password', forgotPasswordRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: error.message, object: error }
    } else {
      console.error(error)
      response = { error: error.message, object: error }
    }
    res.status(500).json(response)
  })

module.exports = app