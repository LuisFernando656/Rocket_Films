const { Router } = require('express')

const usersRouter = require('./users.routes')
const noteRouter = require('./notes.routes')
const tagRouter = require('./tags.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/notes', noteRouter)
routes.use('/tags', tagRouter)

module.exports = routes
