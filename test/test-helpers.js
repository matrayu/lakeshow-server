const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeTeamsArray() {
    return [
        {
            id: 1,
            team_name: 'Atlanta Hawks',
            logo: 'www.teamlogo.com'
        },
        {
            id: 2,
            team_name: 'Boston Celtics',
            logo: 'www.teamlogo.com'
        },
        {
            id: 3,
            team_name: 'Brooklyn Nets',
            logo: 'www.teamlogo.com'
        },
        {
            id: 4,
            team_name: 'Chicago Bulls',
            logo: 'www.teamlogo.com'
        },
        {
            id: 5,
            team_name: 'Golden State Warriors',
            logo: 'www.teamlogo.com'
        },
        {
            id: 6,
            team_name: 'LA Clippers',
            logo: 'www.teamlogo.com'
        },
        {
            id: 7,
            team_name: 'LA Lakers',
            logo: 'www.teamlogo.com'
        }
    ]
}

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      first_name: 'Test',
      last_name: 'User',
      password: 'password',
      email: 'testuser1@email.com',
      gender: 'male',
      dob: '1980-05-04',
      date_created: '2019-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      username: 'test-user-2',
      first_name: 'Test',
      last_name: 'User',
      password: 'password',
      email: 'testuser2@email.com',
      gender: 'female',
      dob: '1989-08-22',
      date_created: '2019-08-11T16:28:32.615Z',
    },
    {
      id: 3,
      username: 'test-user-3',
      first_name: 'Test',
      last_name: 'User',
      password: 'password',
      email: 'testuser3@email.com',
      gender: 'male',
      dob: '2001-01-17',
      date_created: '2019-02-21T16:28:32.615Z',
    },
    {
      id: 4,
      username: 'test-user-4',
      first_name: 'Test',
      last_name: 'User',
      password: 'password',
      email: 'testuser4@email.com',
      gender: 'male',
      dob: '1999-07-04',
      date_created: '2019-07-04T16:28:32.615Z',
    },
  ]
}

function makeTicketsArray() {
  return [
    {
        id: 1,
        game_id: 1,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: true,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
    {
        id: 2,
        game_id: 2,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: true,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
    {
        id: 3,
        game_id: 3,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: true,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
    {
        id: 4,
        game_id: 4,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: true,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
    {
        id: 5,
        game_id: 5,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: true,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
    {
        id: 6,
        game_id: 6,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: true,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
    {
        id: 7,
        game_id: 7,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: false,
        available: false,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: null,
    },
  ]
}

function makeGamesArray() {
  return [
    {
        id: 1,
        home_team: 7,
        away_team: 1,
        local_date: '2019-10-25T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 2,
        home_team: 7,
        away_team: 1,
        local_date: '2019-10-28T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 3,
        home_team: 7,
        away_team: 2,
        local_date: '2019-11-25T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 4,
        home_team: 7,
        away_team: 3,
        local_date: '2019-12-25T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 5,
        home_team: 7,
        away_team: 4,
        local_date: '2020-01-01T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 6,
        home_team: 7,
        away_team: 5,
        local_date: '2020-01-13T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 7,
        home_team: 7,
        away_team: 1,
        local_date: '2020-01-15T00:00:00.000Z',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
  ];
}

function makeExpectedTicket(ticket, teams, games) {
  const game = games.find(game => game.id === ticket.game_id)
  const team = teams.find(team => team.id === game.away_team)
  return {
    id: ticket.id,
    game_id: ticket.game_id,
    section: ticket.section,
    seat_row: ticket.seat_row,
    seats: ticket.seats,
    quantity: ticket.quantity,
    singles_allowed: ticket.singles_allowed,
    local_date: game.local_date,
    local_time: game.local_time,
    venue: game.venue,
    team_name: team.team_name,
    logo: team.logo,
    available: ticket.available
  }
}

/* function makeMaliciousThing(user) {
  const maliciousThing = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedThing = {
    ...makeExpectedThing([user], maliciousThing),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousThing,
    expectedThing,
  }
} */

function makeFixtures() {
  const testUsers = makeUsersArray()
  const testTeams = makeTeamsArray()
  const testGames = makeGamesArray()
  const testTickets = makeTicketsArray()
  return { testUsers, testTeams, testGames, testTickets }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      teams
      RESTART IDENTITY CASCADE`
  )
  .then(() => {
    return db.raw(
      `TRUNCATE
        games
        RESTART IDENTITY CASCADE`
    )
  })
  .then(() => {
    return db.raw(
      `TRUNCATE
        users
        RESTART IDENTITY CASCADE`
    )
  })
  .then(() => {
    return db.raw(
      `TRUNCATE
        tickets
        RESTART IDENTITY CASCADE`
    )
  })
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db
    .into('users')
    .insert(preppedUsers)
    .then(() => 
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id]
      )
    )
}

function seedTeams(db, teams) {
  return db
    .into('teams')
    .insert(teams)
    .then(() => 
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('teams_id_seq', ?)`,
        [teams[teams.length - 1].id]
      )
    )
}

function seedGames(db, games) {
  return db
    .into('games')
    .insert(games)
    .then(() => 
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('games_id_seq', ?)`,
        [games[games.length - 1].id]
      )
    )
}

function seedTickets(db, tickets, teams, games) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedTeams(trx, teams)
    await seedGames(trx, games)
    await trx
      .into('tickets')
      .insert(tickets)
      .leftJoin(
        'games',
        'tickets.game_id',
        'games.id'
      )
      .leftJoin(
        'teams',
        'games.away_team',
        'teams.id'
      )
    // update the auto sequence to match the forced id values
    await trx
      .raw(
        `SELECT setval('tickets_id_seq', ?)`,
        [tickets[tickets.length - 1].id],
      )
  })
}

/* function seedMaliciousThing(db, user, thing) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('thingful_things')
        .insert([thing])
    )
} */

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

function generateHash(pass) {
  bcrypt.hash(pass, 12).then(hash => console.log({ hash }))
}

module.exports = {
  makeUsersArray,
  makeTicketsArray,
  makeGamesArray,
  makeExpectedTicket,
  makeTeamsArray,
  /* makeMaliciousThing, */


  makeFixtures,
  cleanTables,
  seedTickets,
  /* seedMaliciousThing, */
  seedTeams,
  seedGames,
  makeAuthHeader,
  seedUsers,
  generateHash
}
