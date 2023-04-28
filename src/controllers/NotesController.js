const knex = require('../database/knex')

class MovieNotesControlller {
  async create(request, response) {
    const {title, description, grade, movie_tags} = request.body
    const {user_id} = request.params

    const [movie_notes_id] = await knex("movie_notes").insert({
      title,
      description,
      grade,
      user_id
    })

    const movie_tagsInsert = movie_tags.map(name => {
      return{
        movie_notes_id,
        name,
        user_id
      }
    })

    await knex('movie_tags').insert(movie_tagsInsert)

    response.json()

  }

  async show(request, response) {
    const {id} = request.params

    const note = await knex('movie_notes').where({id}).first()
    const tags = await knex('movie_tags').where({movie_notes_id: id}).orderBy('name')

    return response.json({
      ...note,
      tags
    })
  }

  async delete(request, response) {
    const {id} = request.params

    await knex('movie_notes').where({id}).delete()

    return response.json()
  }

  async index(request, response){
    const {user_id, title, movie_tags} = request.query 

    let notes

    if(movie_tags){
      const filterTags = movie_tags.split(',').map(tag => tag.trim() )
      
      notes = await knex('movie_tags')
      .select([
        'movie_notes.id',
        'movie_notes.title',
        'movie_notes.user_id',
      ])
      .where('movie_notes.user_id', user_id)
      .whereLike('movie_notes.title', `%${title}%`)
      .whereIn('name', filterTags)
      .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.movie_notes_id')
      .orderBy('movie_notes.title')
    }else{
      notes = await knex('movie_notes')
      .where({ user_id })
      .whereLike('title', `%${title}%`)
      .orderBy('title')
    }

    const userTags = await knex('movie_tags').where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.movie_notes_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })


    return response.json({notesWithTags})
  }
}

module.exports = MovieNotesControlller