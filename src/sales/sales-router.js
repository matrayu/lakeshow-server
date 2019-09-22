const express = require('express')
const SalesService = require('./tickets-service')

const salesRouter = express.Router()
const jsonBodyParser = express.json()

salesRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { username, }
    })