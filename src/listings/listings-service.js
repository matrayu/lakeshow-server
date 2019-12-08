const ListingsService = {
    getAllListings(db) {
        return db
            .from('products')
            .count('seat_id', {as: 'quantity'})
            .select(
                'listing_id',
                'game_id',
                'list_price_ea',
                'stubhub_price_ea',
                'section',
                'seat_row',
                'seat',
                'available',
                'local_date',
                'local_time',
                'venue_name',
                'game_note',
                't1.team_name as home_team',
                't2.team_name as away_team',
                't1.logo as home_logo',
                't2.logo as away_logo',
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
            .leftJoin(
                'venues',
                'games.venue_id',
                'venues.id',
            )
            .groupBy(
                'listing_id', 
                'game_id', 
                'list_price_ea', 
                'stubhub_price_ea', 
                'section',
                'seat_row',
                'seat', 
                'available',
                'local_date',
                'local_time',
                'venue_name',
                'game_note',
                'home_team',
                'away_team',
                'home_logo',
                'away_logo',
            )
    },

    getById(db, id) {
        return ListingsService.getAllListings(db)
            .where('listing_id', id)
            .first()
    }
}

module.exports = ListingsService