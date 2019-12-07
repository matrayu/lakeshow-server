const express = require('express')
const ListingsService = require('./listings-service')
const listingsRouter = express.Router()

listingsRouter
    .route('/')
    .get((req, res, next) => {
        ListingsService.getAllListings(req.app.get('db'))
            .then(listings => {
              res
                .json(listings);
            })
            .catch(next)
    })

listingsRouter
    .route('/:listing_id')
    .all(checkListingExists)
    .get((req, res) => {
        res
            .status(200)
            .json(res.listing)
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