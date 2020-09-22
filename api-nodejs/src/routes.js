const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const UserController = require('./controllers/UserController')

routes.post('/user', multer(multerConfig('user')).single('file'), UserController.create)
routes.get('/user/:user_id', UserController.list)
routes.get('/user/:user_id/properties', UserController.list_properties)
routes.get('/user/:user_id/rentals', UserController.list_rentals)
routes.get('/user/:user_id/favorites', UserController.list_favorites)
routes.put('/user/:user_id', multer(multerConfig('user')).single('file'), UserController.update)
routes.delete('/user/:user_id', UserController.delete)

module.exports = routes