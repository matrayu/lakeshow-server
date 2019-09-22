const express = require('express')
const TicketsService = require('./tickets-service')

const ticketsRouter = express.Router()

ticketsRouter
    .route('/')
    .get((req, res, next) => {
        TicketsService.getAllTickets(req.app.get('db'))
            .then(tickets => {
                res.json(tickets)
            })
            .catch(next)
    })

ticketsRouter
    .route('/:ticket_id')
    .all(checkTicketExists)
    .get((req, res) => {
        res
            .status(200)
            .json(res.ticket)
    })

    
/* async/await syntax for promises */
async function checkTicketExists(req, res, next) {
    try {
      const ticket = await TicketsService.getById(
        req.app.get('db'),
        req.params.ticket_id
      )
  
      if (!ticket)
        return res.status(404).json({
          error: `Ticket doesn't exist`
        })
  
      res.ticket = ticket
      next()

    } catch (error) {
      next(error)
    }
  }


module.exports = ticketsRouter