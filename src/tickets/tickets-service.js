const xss = require('xss')
const Treeize = require('treeize')

const TicketsService = {
    getAllTickets(db) {
        return db
            .from('tickets')
            .select('*')
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