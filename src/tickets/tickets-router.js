const express = require('express')
const TicketsService = require('./tickets-service')
const ticketsRouter = express.Router()

ticketsRouter
    .route('/')
    .get((req, res, next) => {
        TicketsService.getAllTickets(req.app.get('db'))
            .then(tickets => {
              const pageCount = Math.ceil(tickets.length / 10);
              let page = parseInt(req.query.p);
              if (!page) { page = 1;}
              if (page > pageCount) {
                page = pageCount
              }
              res
                .set({
                  'Access-Control-Expose-Headers': 'content-range, X-Total-Count',
                  'content-range': `tickets 0-9/${tickets.length}`,
                  'X-Total-Count': tickets.length,
                  'Access-Control-Allow-Headers': 'content-range',
                }) 
                .json({
                  "page": page,
                  "pageCount": pageCount,
                  "tickets": tickets.slice(page * 10 - 10, page * 10)
                });
              /* 
                res
                  .set({
                    'Access-Control-Expose-Headers': 'content-range, X-Total-Count',
                    'content-range': `tickets 0-9/${tickets.length}`,
                    'X-Total-Count': tickets.length,
                    'Access-Control-Allow-Headers': 'content-range',
                  }) 
                  .json(tickets)
              */
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