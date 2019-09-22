const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const bcrypt = require('bcryptjs')

describe('Users Endpoints', function() {
    let db

    const { testUsers } = helpers.makeFixtures()
    const testUser = testUsers[0]

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

    describe(`POST /api/users`, () => {
    context(`User Validation`, () => {
        beforeEach('insert users', () =>
            helpers.seedUsers(
                db,
                testUsers,
            )
        )

        const requiredFields = ['username', 'password', 'first_name', 'last_name', 'email', 'gender', 'dob']

        requiredFields.forEach(field => {
            const registerAttemptBody = {
                username: 'test username',
                password: 'test password',
                email: 'test@email.com',
                first_name: 'test',
                last_name: 'test',
                gender: 'male',
                dob: '1999-08-03'

            }
            
            it(`responds with 400 required error when '${field}' is missing`, () => {
                delete registerAttemptBody[field]
      
                return supertest(app)
                  .post('/api/users')
                  .send(registerAttemptBody)
                  .expect(400, {
                    error: `Missing '${field}' in request body`,
                  })
              })
            })

            it(`responds 400 'Password must be longer than 8 characters' when short password`, () => {
                const userShortPassword = {
                    username: 'test username',
                    password: '1234567',
                    email: 'test@email.com',
                    first_name: 'test',
                    last_name: 'test',
                    gender: 'male',
                    dob: '1999-08-03'
                }
                return supertest(app)
                  .post('/api/users')
                  .send(userShortPassword)
                  .expect(400, { error: `Password must be longer than 8 characters` })
            })
      
            it(`responds 400 'Password must be less than 72 characters' when long password`, () => {
              const userLongPassword = {
                username: 'test username',
                password: '*'.repeat(73),
                email: 'test@email.com',
                first_name: 'test',
                last_name: 'test',
                gender: 'male',
                dob: '1999-08-03'
              }
              return supertest(app)
                .post('/api/users')
                .send(userLongPassword)
                .expect(400, { error: `Password must be less than 72 characters` })
            })
      
            it(`responds 400 error when password starts with spaces`, () => {
              const userPasswordStartsWithSpace = {
                username: 'test username',
                password: ' 12@adsUiujOJ',
                email: 'test@email.com',
                first_name: 'test',
                last_name: 'test',
                gender: 'male',
                dob: '1999-08-03'
              }
              return supertest(app)
                .post('/api/users')
                .send(userPasswordStartsWithSpace)
                .expect(400, { error: `Password must not start or end with empty spaces` })
            })
      
            it(`responds 400 error when password ends with spaces`, () => {
              const userPasswordEndsWithSpace = {
                username: 'test username',
                password: '12@adsUiujOJ ',
                email: 'test@email.com',
                first_name: 'test',
                last_name: 'test',
                gender: 'male',
                dob: '1999-08-03'

              }
              return supertest(app)
                .post('/api/users')
                .send(userPasswordEndsWithSpace)
                .expect(400, { error: `Password must not start or end with empty spaces` })
            })
      
            it(`responds 400 error when password isn't complex enough`, () => {
              const userPasswordNotComplex = {
                username: 'test username',
                password: '11AAaabb',
                email: 'test@email.com',
                first_name: 'test',
                last_name: 'test',
                gender: 'male',
                dob: '1999-08-03'
              }
              return supertest(app)
                .post('/api/users')
                .send(userPasswordNotComplex)
                .expect(400, { error: `Password must contain 1 upper case, lower case, number and special character` })
            })
      
            it(`responds 400 'User name already taken' when username isn't unique`, () => {
              const duplicateUser = {
                username: testUser.username,
                password: '11AAaa!!',
                email: 'test@email.com',
                first_name: 'test',
                last_name: 'test',
                gender: 'male',
                dob: '1999-08-03',
              }

              return supertest(app)
                .post('/api/users')
                .send(duplicateUser)
                .expect(400, { error: `Username already taken` })
            })

            it(`responds 400 'Email already registered' when email isn't unique`, () => {
                const duplicateUser = {
                    username: 'test username',
                    password: '11AAaa!!',
                    email: testUser.email,
                    first_name: 'test',
                    last_name: 'test',
                    gender: 'male',
                    dob: '1999-08-03',
                }
  
                return supertest(app)
                  .post('/api/users')
                  .send(duplicateUser)
                  .expect(400, { error: `Email has already been registered` })
              })
          })
          context('Happy Path', () => {
              it(`responds 201, storing bcrypted password`, () => {
                  const newUser = {
                    username: 'test username',
                    password: '11AAaa!!',
                    email: 'test@email.com',
                    first_name: 'test',
                    last_name: 'test',
                    gender: 'male',
                    dob: '1999-08-03',
                  }
                  return supertest(app)
                      .post('/api/users')
                      .send(newUser)
                      .expect(201)
                      /* .expect(res => {
                          expect(res.body).to.have.property('id')
                          expect(res.body.username).to.eql(newUser.username)
                          expect(res.body.full_name).to.eql(newUser.full_name)
                          expect(res.body).not.to.have.property('password')
                          expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
                          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                          const actualDate = new Date(res.body.date_created).toLocaleString()
                          expect(actualDate).to.eql(expectedDate)
                      })
                      .expect(res => 
                          db
                              .from('users')
                              .select('*')
                              .where({ id: res.body.id })
                              .first()
                              .then(row => {
                                  expect(row.username).to.eql(newUser.username)
                                  expect(row.full_name).to.eql(newUser.full_name)
                                  const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                                  const actualDate = new Date(row.date_created).toLocaleString()
                                  expect(actualDate).to.eql(expectedDate)
      
                                  return bcrypt.compare(newUser.password, row.password)
                              })
                              .then(compareMatch => {
                                  expect(compareMatch).to.be.true
                              })    
                      ) */
              })
          })
        })
      })