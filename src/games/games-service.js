const GamesService = {
    getAllGames(db) {
        return db
            .from('games')
            .select(
                'games.id',
                'local_date',
                'local_time',
                'venue_name',
                'game_note',
                't1.team_name as home_team',
                't2.team_name as away_team',
                't1.logo as home_logo',
                't2.logo as away_logo',
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
            .leftJoin(
                'venues',
                'games.venue_id',
                'venues.id',
            )
    },

    getById(db, id) {
        return GamesService.getAllGames(db)
            .where('games.id', id)
            .first("*")
    },

    updateGame(db, gameUpdate) {
        return db
            .from('games')
            .where('games.id', gameUpdate.id)
            .update(gameUpdate)
            .returning('*')
            .then(([game]) => game)
    },
}

module.exports = GamesService