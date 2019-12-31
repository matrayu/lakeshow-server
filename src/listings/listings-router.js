const express = require('express')
const ListingsService = require('./listings-service')
const listingsRouter = express.Router()

listingsRouter
  .route('/')
  .get((req, res, next) => {
      ListingsService.getAllActiveListings(req.app.get('db'))
          .then(allListings => {
            let listings = []

            allListings.map(listing => {
              listings.push({
                id: listing.listing_id,
                available: listing.available,
                qty: listing.quantity,
                prices: {
                  listPriceEa: listing.list_price_ea,
                  compPriceEa: listing.stubhub_price_ea,
                },
                seatInfo: {
                  section: listing.section,
                  row: listing.seat_row,
                  seats: listing.seat,
                  seatMap: {
                    arena: "https://maps.ticketmaster.com/maps/geometry/3/event/2C005709B19C0A96/staticImage?type=png&systemId=HOST",
                    sectionLarge: "https://res.cloudinary.com/matrayu/image/upload/v1574493667/Lakers/rvxhgpfctcbrfbil76g2.png",
                    sectionSmall: "https://res.cloudinary.com/matrayu/image/upload/v1574493431/Lakers/rie56zhvuhmu1hzvveiq.png"
                  }
                },
                event: {
                  id: listing.game_id,
                  name: `${listing.home_team} vs. ${listing.away_team}`,
                  teams: {
                    home: listing.home_team,
                    away: listing.away_team
                  },
                  dates: {
                    localDate: listing.local_date,
                    localTime: listing.local_time,
                  },
                  note: listing.game_note
                },
                venue: listing.venue_name,
                images: {
                  homeLogo: listing.home_logo,
                  awayLogo: listing.away_logo
                }
              })
            })
            res
              .status(200)
              .json(listings);
          })
          .catch(next)
  })

listingsRouter
  .route('/admin')
  .get((req, res, next) => {
    ListingsService.getAllListings(req.app.get('db'))
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

listingsRouter
  .route('/all')
  .get((req, res, next) => {
    ListingsService.getAllListings(req.app.get('db'))
      .then(listings => {
        const pageCount = Math.ceil(listings.length / 10);
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
        
        let listingOutput = listings.sort(compare).slice(range[0], range[1] + 1)
        let contentRange = `listings ${range[0]}-${range[1]}/${listings.length}`
        
        res
          .set({
            'Access-Control-Expose-Headers': 'content-range, X-Total-Count',
            'content-range': contentRange,
            'X-Total-Count': listings.length,
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
            listings: listingOutput
          });
      })
      .catch(next)
  })


listingsRouter
  .route('/:listing_id')
  .all(checkListingExists)
  .get((req, res) => {

    let sl = res.listing

    let listing = {
      id: sl.listing_id,
      available: sl.available,
      qty: sl.quantity,
      prices: {
        listPriceEa: sl.list_price_ea,
        compPriceEa: sl.stubhub_price_ea,
      },
      seatInfo: {
        section: sl.section,
        row: sl.seat_row,
        seats: sl.seat,
        seatMap: {
          arena: "https://maps.ticketmaster.com/maps/geometry/3/event/2C005709B19C0A96/staticImage?type=png&systemId=HOST",
          sectionLarge: "https://res.cloudinary.com/matrayu/image/upload/v1574493667/Lakers/rvxhgpfctcbrfbil76g2.png",
          sectionSmall: "https://res.cloudinary.com/matrayu/image/upload/v1574493431/Lakers/rie56zhvuhmu1hzvveiq.png"
        }
      },
      event: {
        id: sl.game_id,
        name: `${sl.home_team} vs. ${sl.away_team}`,
        teams: {
          home: sl.home_team,
          away: sl.away_team
        },
        dates: {
          localDate: sl.local_date,
          localTime: sl.local_time,
        },
        note: sl.game_note
      },
      venue: sl.venue_name,
      images: {
          homeLogo: sl.home_logo,
          awayLogo: sl.away_logo
      }
    }
    res
        .status(200)
        .json(listing)
  })

    
/* async/await syntax for promises */
async function checkListingExists(req, res, next) {
  try {
    const listing = await ListingsService.getById(
      req.app.get('db'),
      req.params.listing_id
    )

    if (!listing)
      return res.status(404).json({
        error: `Listing doesn't exist`
      })

    res.listing = listing
    next()

  } catch (error) {
    next(error)
  }
}




module.exports = listingsRouter