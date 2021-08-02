const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')

const authorize = (req, res, next) => {
  const activeUser = jwt.verify(req.token, jwt_secret)
  
  if(!activeUser){
    throw new Error('please login first')
  }
  next()
  console.log('middleware authorize jalan')
}

module.exports = {
  authorize
}