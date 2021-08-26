const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')
const path = require('path')
const fs = require('fs')

const generateToken = (data) => {
  return jwt.sign(data, jwt_secret) 
}

const removeImageFile = (filepath) => {
  const deletefile = path.join(__dirname,'../../public/', filepath)
  fs.unlinkSync(deletefile)
}


module.exports = {
  generateToken,
  removeImageFile
}