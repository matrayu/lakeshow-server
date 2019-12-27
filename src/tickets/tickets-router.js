const express = require('express')
const TicketsService = require('./tickets-service')
const ticketsRouter = express.Router()
const jsonBodyParser = express.json()

ticketsRouter
  .route('/')
  .get((req, res, next) => {
      TicketsService.getAllTickets(req.app.get('db'))
      .then(tickets => {
        const pageCount = Math.ceil(tickets.length / 10);
        let page = parseInt(req.query.page);
        let range = JSON.parse(req.query.range);
        let sort = JSON.parse(req.query.sort)

        console.log(page, range, sort)

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

  ticketsRouter
  .route('/')
  .put(jsonBodyParser, (req, res, next) => {
    const { id, list_price_ea, stubhub_price_ea, discount_available, available } = req.body
    const update = { id, list_price_ea, stubhub_price_ea, discount_available, available }

    for (const [key, value] of Object.entries(update))
      if (value == null) {
        delete update[key]
      }
    
    console.log("UPDATE EQUALS", update)

    TicketsService.updateListing(req.app.get('db'), update)
      .then(updates => {
        console.log("Router Update", updates)
        res
          .status(201)
          .json({ update: updates })
          /* .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review)) */
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