const { sequelize } = require('../../src/models')
const truncate = require('../utils/truncate')
const factory = require('../factories')

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
    const user = await factory.create('User')

    expect(user.id).toBeTruthy()
  })

  it("should create a property", async () => {
    const property = await factory.create('Property')

    expect(property.id).toBeTruthy()
    expect(property.user_id).toBeTruthy()
  })

  it("should create a image", async () => {
    const image = await factory.create('Image')

    expect(image.id).toBeTruthy()
    expect(image.property_id).toBeTruthy()
  })

  it("should create a rental", async () => {
    const rental = await factory.create('Rental')

    expect(rental.user_id).toBeTruthy()
    expect(rental.property_id).toBeTruthy()
  })

  it("should create a favorite", async () => {
    const favorite = await factory.create('Favorite')

    expect(favorite.user_id).toBeTruthy()
    expect(favorite.property_id).toBeTruthy()
  })
})