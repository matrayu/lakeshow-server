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
            id: 1,
            team_name: 'Boston Celtics',
            logo: 'www.teamlogo.com'
        },
        {
            id: 1,
            team_name: 'Brooklyn Nets',
            logo: 'www.teamlogo.com'
        },
        {
            id: 1,
            team_name: 'Chicago Bulls',
            logo: 'www.teamlogo.com'
        },
        {
            id: 1,
            team_name: 'Golden State Warriors',
            logo: 'www.teamlogo.com'
        },
        {
            id: 1,
            team_name: 'LA Clippers',
            logo: 'www.teamlogo.com'
        },
        {
            id: 1,
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

function makeTicketArray(tickets) {
  return [
    {
        id: 1,
        game_id: 1,
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
        id: 1,
        game_id: 2,
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
        id: 1,
        game_id: 3,
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
        id: 1,
        game_id: 4,
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

function makeGamesArray(teams, tickets) {
  return [
    {
      id: 1,
      home_team: 7,
      away_team: 1,
      local_date: '2019-10-25',
      local_time: '18:30:00',
      venue: 'STAPLES Center'
    },
    {
      id: 2,
      rating: 3,
      text: 'Second test review!',
      thing_id: things[0].id,
      user_id: users[1].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      rating: 1,
      text: 'Third test review!',
      thing_id: things[0].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      rating: 5,
      text: 'Fourth test review!',
      thing_id: things[0].id,
      user_id: users[3].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 5,
      rating: 1,
      text: 'Fifth test review!',
      thing_id: things[things.length - 1].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 6,
      rating: 2,
      text: 'Sixth test review!',
      thing_id: things[things.length - 1].id,
      user_id: users[2].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 7,
      rating: 5,
      text: 'Seventh test review!',
      thing_id: things[3].id,
      user_id: users[0].id,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeExpectedThing(users, thing, reviews=[]) {
  const user = users
    .find(user => user.id === thing.user_id)

  const thingReviews = reviews
    .filter(review => review.thing_id === thing.id)

  const number_of_reviews = thingReviews.length
  const average_review_rating = calculateAverageReviewRating(thingReviews)

  return {
    id: thing.id,
    image: thing.image,
    title: thing.title,
    content: thing.content,
    date_created: thing.date_created,
    number_of_reviews,
    average_review_rating,
    user: {
      id: user.id,
      user_name: user.user_name,
      full_name: user.full_name,
      nickname: user.nickname,
      date_created: user.date_created,
    },
  }
}

function calculateAverageReviewRating(reviews) {
  if(!reviews.length) return 0

  const sum = reviews
    .map(review => review.rating)
    .reduce((a, b) => a + b)

  return Math.round(sum / reviews.length)
}

function makeExpectedThingReviews(users, thingId, reviews) {
  const expectedReviews = reviews
    .filter(review => review.thing_id === thingId)

  return expectedReviews.map(review => {
    const reviewUser = users.find(user => user.id === review.user_id)
    return {
      id: review.id,
      text: review.text,
      rating: review.rating,
      date_created: review.date_created,
      user: {
        id: reviewUser.id,
        user_name: reviewUser.user_name,
        full_name: reviewUser.full_name,
        nickname: reviewUser.nickname,
        date_created: reviewUser.date_created,
      }
    }
  })
}

function makeMaliciousThing(user) {
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
}

function makeThingsFixtures() {
  const testUsers = makeUsersArray()
  const testThings = makeThingsArray(testUsers)
  const testReviews = makeReviewsArray(testUsers, testThings)
  return { testUsers, testThings, testReviews }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      thingful_things
      RESTART IDENTITY CASCADE`
  )
  .then(() => {
    return db.raw(
      `TRUNCATE
        thingful_users
        RESTART IDENTITY CASCADE`
    )
  })
  .then(() => {
    return db.raw(
      `TRUNCATE
        thingful_reviews
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
    .into('thingful_users')
    .insert(preppedUsers)
    .then(() => 
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('thingful_users_id_seq', ?)`,
        [users[users.length - 1].id]
      )
    )
}

function seedThingsTables(db, users, things, reviews=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx
      .into('thingful_things')
      .insert(things)
    // update the auto sequence to match the forced id values
    await trx
      .raw(
        `SELECT setval('thingful_things_id_seq', ?)`,
        [things[things.length - 1].id],
      )
    // only insert comments if there are some, also update the sequence counter
    if (reviews.length) {
      await trx
        .into('thingful_reviews')
        .insert(reviews)
      await trx
        .raw(
          `SELECT setval('thingful_reviews_id_seq', ?)`,
          [reviews[reviews.length - 1].id],
        )
    }
  })
}

function seedMaliciousThing(db, user, thing) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('thingful_things')
        .insert([thing])
    )
}

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
  makeThingsArray,
  makeExpectedThing,
  makeExpectedThingReviews,
  makeMaliciousThing,
  makeReviewsArray,

  makeThingsFixtures,
  cleanTables,
  seedThingsTables,
  seedMaliciousThing,
  makeAuthHeader,
  seedUsers,
  generateHash
}
