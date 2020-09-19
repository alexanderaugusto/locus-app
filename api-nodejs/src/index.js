require('dotenv').config()

const http = require('http')

const app = require('./app')

const httpServer = http.createServer(app)
const server = httpServer.listen(process.env.PORT || 5000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log("Server is running on http://%s:%s", host, port)
})