const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Protected Endpoints', function() {
    let db
  
    const { testUsers } = helpers.makeFixtures()
  
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
  
    beforeEach(`insert users`, () =>
      helpers.seedUsers(
        db, 
        testUsers
      )
    )

    const protectedEndpoints = [
        {
          name: `POST /api/auth/refresh`,
          method: supertest(app).post(`/api/auth/refresh`)
        },
    ]

    protectedEndpoints.forEach(endpoint => {
        describe(endpoint.name, () => {
            it(`responds 401 'Missing bearer token' when no token exists`, () => {
              return endpoint.method
                .expect(401, { error: 'Missing bearer token' })
            })

            it(`responds 401 'Unauthorized request' when no credentials`, () => {
              const validUser = testUsers[0]
              const invalidSecret = 'bad-secret'
              return endpoint.method
                .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
                .expect(401, { error: 'Unauthorized request' })
            })

            it(`responds 401 'Unauthorized request' when invalid user`, () => {
              const userInvalid = { username: 'not-user', password: 'exists' }
              return endpoint.method
                .set('Authorization', helpers.makeAuthHeader(userInvalid))
                .expect(401, { error: 'Unauthorized request' })
            })
        })
    })
})