const bcrypt = require('bcryptjs')

const encryptPassword = (password) => {
  return bcrypt.hash(password, 8)
}

module.exports = {
  encryptPassword
}