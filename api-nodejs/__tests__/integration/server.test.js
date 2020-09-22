const request = require('supertest')
const app = require('../../src/app')

describe("Server test", () => {
  it("Should connect to server and return 404", async () => {
    const response = await request(app).get("/")

    expect(response.status).toBe(404)
  })
})