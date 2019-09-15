require('dotenv').config()
const { expect } = require('chai')
const supertest = require('supertest')

process.env.TZ = 'UTC'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'change-this-secret'
process.env.JWT_EXPIRY = '3h'
process.env.TEST_DB_URL = process.env.TEST_DB_URL
  || "postgresql://matrayu@localhost/numerology_test"

global.expect = expect
global.supertest = supertest