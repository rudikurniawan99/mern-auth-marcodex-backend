const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  roleAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.verifyPassword = async function(pass){
  return await bcrypt.compare(pass, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
