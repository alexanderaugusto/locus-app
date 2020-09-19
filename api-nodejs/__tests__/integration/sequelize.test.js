const { sequelize } = require('../../src/models')
const truncate = require('../utils/truncate')

describe("Sequelize test", () => {
  beforeEach(async () => {
    await truncate()
  })

  it("should connect to database", async () => {
    expect.assertions(0)
    
    try {
      await sequelize.authenticate()
    } catch (err) {
      expect(err).toMatch('Unable to connect to the database')
    }
  })

  it("should create a user", async () => {
    
  })
})