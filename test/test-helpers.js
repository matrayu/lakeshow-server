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
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      password: 'password',
      email: 'testuser1@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      password: 'password',
      email: 'testuser2@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      password: 'password',
      email: 'testuser3@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      password: 'password',
      email: 'testuser4@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeTicketsArray(games) {
  return [
    {
        id: 1,
        game_id: games[0].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
    {
        id: 2,
        game_id: games[1].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
    {
        id: 3,
        game_id: games[2].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
    {
        id: 4,
        game_id: games[3].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
    {
        id: 5,
        game_id: games[4].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
    {
        id: 6,
        game_id: games[5].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
    {
        id: 7,
        game_id: games[6].id,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE,
        date_created: '2029-01-22T16:28:32.615Z',
        sale_id: '',
    },
  ]
}

function makeGamesArray(teams) {
  return [
    {
        id: 1,
        home_team: teams[6].team_name,
        away_team: teams[0].team_name,
        local_date: '2019-10-25',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 2,
        home_team: teams[6].team_name,
        away_team: teams[1].team_name,
        local_date: '2019-10-28',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 3,
        home_team: teams[6].team_name,
        away_team: teams[2].team_name,
        local_date: '2019-11-25',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 4,
        home_team: teams[6].team_name,
        away_team: teams[3].team_name,
        local_date: '2019-12-25',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 5,
        home_team: teams[6].team_name,
        away_team: teams[4].team_name,
        local_date: '2020-01-01',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 6,
        home_team: teams[6].team_name,
        away_team: teams[5].team_name,
        local_date: '2020-01-13',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
    {
        id: 7,
        home_team: teams[6].team_name,
        away_team: teams[1].team_name,
        local_date: '2020-01-15',
        local_time: '18:30:00',
        venue: 'STAPLES Center'
    },
  ];
}

function makeExpectedTicket(tickets, ticket_id) {
  const ticket = tickets.find(ticket => ticket.id === ticket_id)

  return {
    id: 1,
        game_id: 4,
        section: '114',
        seat_row: '18W',
        seats: [3,4],
        quantity: 2,
        singles_allowed: FALSE,
        available: TRUE
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
  return { testUsers }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      tickets
      RESTART IDENTITY CASCADE`
  )
  .then(() => {
    return db.raw(
      `TRUNCATE
        users
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

function seedTicketsTables(db, tickets) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx
      .into('tickets')
      .insert(tickets)
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
    subject: user.user_name,
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
  seedTicketsTables,
  /* seedMaliciousThing, */
  seedTeams,
  makeAuthHeader,
  seedUsers,
  generateHash
}
