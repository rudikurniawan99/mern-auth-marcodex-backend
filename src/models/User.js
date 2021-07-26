const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
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

const User = mongoose.model('User', UserSchema)

module.exports = User
