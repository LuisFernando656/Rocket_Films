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
    
  }
}

module.exports = MovieNotesControlller