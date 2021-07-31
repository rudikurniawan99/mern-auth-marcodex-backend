const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')

const generateToken = (data) => {
  return jwt.sign(data, jwt_secret) 
}

module.exports = {
  generateToken
}