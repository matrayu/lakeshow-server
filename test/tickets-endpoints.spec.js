const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Tickets Endpoints', function() {
  let db

  const {testUsers, testTickets, testGames, testTeams } = helpers.makeFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/tickets`, () => {
    context(`Given no tickets`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/tickets')
          .expect(200, [])
      })
    })

    context('Given there are tickets in the database', () => {
      beforeEach('cleanup', () => helpers.cleanTables(db))
      beforeEach('insert tickets', () =>
        helpers.seedTickets(
          db,
          testTickets,
          testTeams,
          testGames
        )
      )

      it('responds with 200 and all of the tickets', () => {
        const expectedTickets = testTickets.map(ticket =>
          helpers.makeExpectedTicket(ticket, testTeams, testGames)
        )
        return supertest(app)
          .get('/api/tickets')
          .expect(200, expectedTickets)
      })
    })

    /* context(`Given an XSS attack thing`, () => {
      beforeEach('cleanup', () => helpers.cleanTables(db))
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousThing,
        expectedThing,
      } = helpers.makeMaliciousThing(testUser)

      beforeEach('insert malicious thing', () => {
        return helpers.seedMaliciousThing(
          db,
          testUser,
          maliciousThing,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/things`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedThing.title)
            expect(res.body[0].content).to.eql(expectedThing.content)
          })
      })
    }) */
  })

  describe(`GET /api/tickets/:ticket_id`, () => {
    context(`Given no tickets`, () => {
      beforeEach('insert tickets', () =>
        helpers.seedTickets(
          db,
          testTickets,
          testTeams,
          testGames
        )
      )
      it(`responds with 404`, () => {
        const ticketId = 123456
        return supertest(app)
          .get(`/api/tickets/${ticketId}`)
          .expect(404, { error: `Ticket doesn't exist` })
      })
    })

    context('Given there are tickets in the database', () => {
      beforeEach('cleanup', () => helpers.cleanTables(db))
      beforeEach('insert tickets', () =>
        helpers.seedTickets(
          db,
          testTickets,
          testTeams,
          testGames
        )
      )

      it('responds with 200 and the specified ticket', () => {
        const ticketId = 2
        const expectedTicket = helpers.makeExpectedTicket(
          testTickets[ticketId - 1],
          testTeams,
          testGames
        )

        return supertest(app)
          .get(`/api/tickets/${ticketId}`)
          .expect(200, expectedTicket)
      })
    })

    /* context(`Given an XSS attack thing`, () => {
      beforeEach('cleanup', () => helpers.cleanTables(db))
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousThing,
        expectedThing,
      } = helpers.makeMaliciousThing(testUser)

      beforeEach('insert malicious thing', () => {
        return helpers.seedMaliciousThing(
          db,
          testUser,
          maliciousThing,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/things/${maliciousThing.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedThing.title)
            expect(res.body.content).to.eql(expectedThing.content)
          })
      })
    }) */
  })
})
