const xss = require('xss')
const Treeize = require('treeize')

const TicketsService = {
    getAllTickets(db) {
        return db
            .from('products')
            .select(
                'products.id',
                'game_id',
                'section',
                'seat_row',
                'seat',
                'quantity',
                'list_price_ea',
                'stubhub_price_ea',
                'ticketmaster_price_ea',
                'ebay_price_ea',
                'discount_available',
                'singles_allowed',
                'local_date',
                'local_time',
                'venue',
                't1.team_name as home_team',
                't2.team_name as away_team',
                't1.logo as home_logo',
                't2.logo as away_logo',
                'available'
            )
            .where('products.available', true)
            .leftJoin(
                'games',
                'products.game_id',
                'games.id',
            )
            .leftJoin(
                'teams as t1',
                'games.team_id_home',
                't1.id',
            )
            .leftJoin(
                'teams as t2',
                'games.team_id_away',
                't2.id',
            )
    },

    getById(db, id) {
        return TicketsService.getAllTickets(db)
            .where('products.id', id)
            .first(ticket => {
                console.log(ticket)
            })
    }
}

module.exports = TicketsService