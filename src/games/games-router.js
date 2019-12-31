const express = require('express')
const GamesService = require('./games-service')
const gamesRouter = express.Router()
const jsonBodyParser = express.json()

let moment = require("moment");

gamesRouter
  .route('/')
  .get((req, res, next) => {
    console.log("************* GET ALL GAMES ****************")
    GamesService.getAllGames(req.app.get('db'))
      .then(games => {
        let data = games.map(game => {
          let date = moment(game.local_date).format("YYYY-MM-DD")
          let title = `${date} - Lakers vs ${game.away_team}`
          return (
            {
              ...game, 
              title
            }
          )
        })

        let page;
        let range;
        let sort;
        let filter;

        !req.query.page ? page = 1 :  page = parseInt(req.query.page)
        !req.query.range ? range = [0,9] : range = JSON.parse(req.query.range)
        !req.query.sort ? sort = ['id', 'ASC'] : sort = JSON.parse(req.query.sort)
        !req.query.filter ? filter = null : filter = JSON.parse(req.query.filter)

        console.log("Page",page, "Range",range, "Sort",sort, "Filter",filter)

        function isValidObject(objToTest) {
            if (objToTest == null) return false;
            if ("undefined" == typeof(objToTest)) return false;
            if (Object.keys(objToTest).length === 0) return false;
            return true
        }

        let filteredList = []
        if (isValidObject(filter)) {
            filter.id.map(id => {
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

gamesRouter
  .route('/:game_id')
  .put(jsonBodyParser, (req, res, next) => {
    console.log("************* PUT REQUEST ***************")
    const { id, local_date, local_time, game_note } = req.body
    const update = { id, local_date, local_time, game_note }

    console.log(update)

    for (const [key, value] of Object.entries(update))
      if (value == null) {
        delete update[key]
      }
    
    console.log("UPDATE EQUALS", update)

    GamesService.updateGame(req.app.get('db'), update)
      .then(updates => {
        console.log("Router Update", updates)
        res
          .status(200)
          .json(updates)
          /* .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review)) */
      })
      .catch(next)
})

gamesRouter
  .route('/:game_id')
  .all(checkGameExists)
  .get((req, res) => {
    console.log("************* CHECK ALL GAMES REQUEST ***************")
    console.log(res)
    
    
    let title = `Lakers vs ${res.game.away_team}`
    let game = {...res.game, title}


    res
        .status(200)
        .json(game)
})

    
/* async/await syntax for promises */
async function checkGameExists(req, res, next) {
  try {
    const game = await GamesService.getById(
      req.app.get('db'),
      req.params.game_id
    )

    if (!game)
      return res.status(404).json({
        error: `Game doesn't exist`
      })

    res.game = game
    next()

  } catch (error) {
    next(error)
  }
}

module.exports = gamesRouter