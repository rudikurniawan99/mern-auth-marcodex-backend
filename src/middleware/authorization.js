const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')

const authorize = (req, res, next) => {
  const { token } = req.headers

  const user = jwt.verify(token, jwt_secret)
  
  console.log('verify jwt', user)

  if(!user){
    throw new Error('please login first')
  }
  next()
}

module.exports = {
  authorize
}