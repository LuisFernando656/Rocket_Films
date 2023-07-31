const {Router} = require('express')

const NotesController = require('../controllers/NotesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const noteRoutes = Router()

const notesController = new NotesController()

noteRoutes.use(ensureAuthenticated) 

noteRoutes.post('/:user_id', notesController.create)
noteRoutes.get('/:id', notesController.show)
noteRoutes.delete('/:id', notesController.delete)
noteRoutes.get('/', notesController.index)

module.exports = noteRoutes