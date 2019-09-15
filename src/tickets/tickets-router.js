const express = require('express')
const TicketsService = require('./tickets-service')

const ticketsRouter = express.Router()

ticketsRouter
    .route('/')
    .get((req, res, next) => {
        console.log('here')
        TicketsService.getAllTickets(req.app.get('db'))
            .then(tickets => {
                res.json(tickets)
            })
            .catch(next)
    })

module.exports = ticketsRouter