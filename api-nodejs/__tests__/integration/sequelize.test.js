const { sequelize } = require('../../src/models')

describe("Sequelize test", () => {
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