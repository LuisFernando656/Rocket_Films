const {hash, compare} = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get('select * from users where email = (?)', [email])

    if(checkUserExists) {
      throw new AppError('Este email ja esta em uso')
    }

    const hashedPassword = await hash(password, 8)

    await database.run("insert into users (name, email, password) values(?,?,?)", [name, email, hashedPassword])

    return response.status(201).json()
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body
    const {id} = request.params

    const database = await sqliteConnection()
    const user = await database.get('select * from users where id = (?)', [id])

    if(!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await  database.get('select * from users where email = (?)', [email])

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id){
      throw new AppError('Este email já está cadastrado')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password){
      throw new AppError('Digite a senha antiga')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword){
        throw new AppError('As senhas não conferem')
      }

      user.password = await hash(password,8)
    }

    await database.run(`
    update users set
    name = ?,
    email = ?,
    password = ?,
    updated_at = datetime('now')
    where id = ?`,
    [user.name, user.email, user.password, id])

    return response.json()
  }
}

module.exports = UsersControllers
