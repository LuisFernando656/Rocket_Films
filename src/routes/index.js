const { Router } = require('express')

const usersRouter = require('./users.routes')
const noteRouter = require('./notes.routes')
const tagRouter = require('./tags.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/notes', noteRouter)
routes.use('/tags', tagRouter)

module.exports = routes
