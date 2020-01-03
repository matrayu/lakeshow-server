const express = require('express')
const TicketsService = require('./tickets-service')
const ticketsRouter = express.Router()
const jsonBodyParser = express.json()

ticketsRouter
  .route('/')
  .get((req, res, next) => {
    TicketsService.getAllTickets(req.app.get('db'))
    .then(data => {
      let page;
      let range;
      let sort;
      let filter;

      !req.query.page ? page = 1 :  page = parseInt(req.query.page)
      !req.query.range ? range = [0,9] : range = JSON.parse(req.query.range)
      !req.query.sort ? sort = ['id', 'ASC'] : sort = JSON.parse(req.query.sort)
      !req.query.filter ? filter = null : filter = JSON.parse(req.query.filter)

      function isValidObject(objToTest) {
          if (objToTest == null) return false;
          if ("undefined" == typeof(objToTest)) return false;
          if (Object.keys(objToTest).length === 0) return false;
          return true
      }

      console.log(filter)

      let filteredList = []
      if (isValidObject(filter)) {
          filter.q.map(id => {
              filteredList.push(data.filter(d => d.id == id))
          })
          data = []
          filteredList.map(d => {
              data.push(d[0])
          })
      }

      const pageCount = Math.ceil(data.length / 10);
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
      
      let dataOutput = data.sort(compare).slice(range[0], range[1] + 1)
      let contentRange = `data ${range[0]}-${range[1]}/${data.length}`
      res
          .set({
              'Access-Control-Expose-Headers': 'content-range, X-Total-Count',
              'content-range': contentRange,
              'X-Total-Count': data.length,
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
              data: dataOutput
          });
    })
    .catch(next)
})

ticketsRouter
  .post('/', jsonBodyParser, (req, res, next) => {
  const { id, section, seat_row, seat = [], purchase_price_ea, list_price_ea, discount_available, singles_allowed} = req.body

  for (const field of ['id', 'section', 'seat_row', 'purchase_price_ea', 'list_price_ea'])
      if (!req.body[field])
          return res.status(400).json({
              error: `Missing '${field}' in request body`
          })
  
  const newTicket = { game_id: id, section, seat_row, seat, purchase_price_ea, list_price_ea, discount_available, singles_allowed }

  TicketsService.insertTicket(req.app.get('db'),newTicket)
    .then(ticket => {
        return res
            .status(201)
    })
    .catch(next)
})

ticketsRouter
  .route('/:ticket_id')
  .put(jsonBodyParser, (req, res, next) => {
  const { id, list_price_ea, stubhub_price_ea, discount_available, available } = req.body
  const update = { id, list_price_ea, stubhub_price_ea, discount_available, available }

  for (const [key, value] of Object.entries(update))
    if (value == null) {
      delete update[key]
    }

  TicketsService.updateListing(req.app.get('db'), update)
    .then(updates => {
      res
        .status(200)
        .json(updates)
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