const express = require('express')
const cors = require('cors')
const path = require('path')

class AppController {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(cors())
    this.express.use('/storage/user', express.static(path.resolve(__dirname, "../tmp/uploads/user")))
    this.express.use('/storage/property', express.static(path.resolve(__dirname, "../tmp/uploads/property")))
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new AppController().express