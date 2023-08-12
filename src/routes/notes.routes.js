const {Router} = require('express')

const NotesController = require('../controllers/NotesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const noteRoutes = Router()

const notesController = new NotesController()

noteRoutes.use(ensureAuthenticated) 

noteRoutes.get('/', notesController.index)
noteRoutes.post('/', notesController.create)
noteRoutes.get('/:id', notesController.show)
noteRoutes.delete('/:id', notesController.delete)

module.exports = noteRoutes