const {Router} = require('express')

const NotesController = require('../controllers/NotesController')

const noteRoutes = Router()

const notesController = new NotesController()

noteRoutes.post('/:user_id', notesController.create)
noteRoutes.get('/:id', notesController.show)

module.exports = noteRoutes