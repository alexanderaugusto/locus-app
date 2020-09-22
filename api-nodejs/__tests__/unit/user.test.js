const request = require('supertest')
const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe("User test", () => {
  beforeEach(async () => {
    await truncate()
  })

  it("Should create a user using api route", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        email: "alexaasf_10@hotmail.com",
        password: "12345678",
        name: "Alexander Augusto",
        cpf: "111.111.111-00",
        phone: "35984529203"
      })

    expect(response.status).toBe(200)
    expect(response.body.email).toBe("alexaasf_10@hotmail.com")
  })
  it("Should list a user using api route", async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .get("/user/" + user.id)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(user.id)
  })
  it("Should list user properties using api route", async () => {
    const user = await factory.create('User')
    await factory.create('Property', {
      user_id: user.id
    })
    await factory.create('Property', {
      user_id: user.id
    })

    const response = await request(app)
      .get("/user/" + user.id + "/properties")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
  })
  it("Should list user rentals using api route", async () => {
    const user = await factory.create('User')
    await factory.create('Rental', {
      user_id: user.id
    })
    await factory.create('Rental', {
      user_id: user.id
    })

    const response = await request(app)
      .get("/user/" + user.id + "/rentals")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
  })
  it("Should list user favorites using api route", async () => {
    const user = await factory.create('User')
    await factory.create('Favorite', {
      user_id: user.id
    })
    await factory.create('Favorite', {
      user_id: user.id
    })

    const response = await request(app)
      .get("/user/" + user.id + "/favorites")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
  })
  it("Should update a user using api route", async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .put("/user/" + user.id)
      .send({
        name: "Vanessa Swerts",
        cpf: "000.000.000-11"
      })

    expect(response.status).toBe(204)
  })
  it("Should delete a user using api route", async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .delete("/user/" + user.id)

    expect(response.status).toBe(204)
  })
})