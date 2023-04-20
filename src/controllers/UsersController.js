const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex('users').where({ email })

    if(checkUserExists) {
      throw new AppError('Este email ja esta em uso')
    }

    return response.status(201).json
  }
}

module.exports = UsersControllers
