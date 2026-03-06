import bcrypt from 'bcryptjs'

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

export const comparePassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword)
}
