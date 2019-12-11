const express = require('express')
const TicketsService = require('../tickets/tickets-service')
const adminRouter = express.Router()

adminRouter
    .route('/tickets')
    .get((req, res, next) => {
        TicketsService.getAllTickets(req.app.get('db'))
            .then(tickets => {
              const pageCount = Math.ceil(tickets.length / 10);
              let page = parseInt(req.query.page);
              let range = JSON.parse(req.query.range);
              let sort = JSON.parse(req.query.sort)

              let sortBy = sort[0]
              let OrderBy = sort[1]
              let sorted = 0

              if (!page) { page = 1;}

              if (page > pageCount) {
                page = pageCount
              }

              if(sortBy && OrderBy){
                if(OrderBy === 'DESC') {
                  sorted = -1
                }
                else {
                  sorted = 1
                }
              }

              let compare = (a, b) => {
                // Use toUpperCase() to ignore character casing
                const sortA = a[sortBy];
                const sortB = b[sortBy];          
                
                let comparison = 0;
                if (sortA > sortB) {
                  comparison = 1;
                } else if (sortA < sortB) {
                  comparison = -1;
                }
                return comparison * sorted;
              }
              
              let ticketOutput = tickets.sort(compare).slice(range[0], range[1] + 1)
              let contentRange = `tickets ${range[0]}-${range[1]}/${tickets.length}`
              console.log(ticketOutput)
              
              res
                .set({
                  'Access-Control-Expose-Headers': 'content-range, X-Total-Count',
                  'content-range': contentRange,
                  'X-Total-Count': tickets.length,
                  'Access-Control-Allow-Headers': 'content-range',
                })
                .json({
                  "pagination": {
                    "page": page,
                    "pageCount": pageCount,
                  },
                  "sort": {
                    "field": sortBy,
                    "order": OrderBy
                  },
                  "filter": {},
                  tickets: ticketOutput
                });
            })
            .catch(next)
    })

adminRouter
    .route('/tickets/:ticket_id')
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


module.exports = adminRouter