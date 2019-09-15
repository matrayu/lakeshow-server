const xss = require('xss')
const Treeize = require('treeize')

const TicketsService = {
    getAllTickets(db) {
        return db
            .from('tickets')
            .select(
                'tickets.id',
                'game_id',
                'section',
                'seat_row',
                'seats',
                'quantity',
                'singles_allowed',
                'local_date',
                'local_time',
                'venue',
                'team_name',
                'logo'
            )
            .where('tickets.available', true)
            .leftJoin(
                'games',
                'tickets.game_id',
                'games.id',
            )
            .leftJoin(
                'teams',
                'games.away_team',
                'teams.id',
            )
    },

    getById(db, id) {
        return TicketsService.getAllTickets(db)
            .where('tickets.id', id)
            .first()
    }
}

module.exports = TicketsService