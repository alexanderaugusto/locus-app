const routes = require('express').Router()

const UserController = require('./controllers/UserController')

routes.post('/user', UserController.create)
routes.get('/user/:user_id', UserController.list)
routes.get('/user/:user_id/properties', UserController.list_properties)
routes.get('/user/:user_id/rentals', UserController.list_rentals)
routes.get('/user/:user_id/favorites', UserController.list_favorites)
routes.put('/user/:user_id', UserController.update)
routes.delete('/user/:user_id', UserController.delete)

module.exports = routes