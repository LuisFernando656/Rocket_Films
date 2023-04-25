const { Router } = require('express')

const usersRouter = require('./users.routes')
const noteRouter = require('./notes.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/notes', noteRouter)

module.exports = routes
