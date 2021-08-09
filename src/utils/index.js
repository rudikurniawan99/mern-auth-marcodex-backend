const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')
const path = require('path')
const fs = require('fs')

const generateToken = (data) => {
  return jwt.sign(data, jwt_secret) 
}

const removeImageFile = (filepath) => {
  filepath = path.join(__dirname,'../../', filepath)

  fs.unlink(filepath)
}


module.exports = {
  generateToken,
  removeImageFile
}