const AppError = require('../utils/AppError')

const sqliteConnnection = require('../database/sqlite')

class UsersControllers {

  create (request, response)  {
      const {name, email, password} = request.body


    }
  }

module.exports = UsersControllers