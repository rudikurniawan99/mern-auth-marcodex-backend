const { User } = require('../models')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/config')


module.exports = {
  async register(req, res){
    try{
      const { email, password } = req.body
      
      if(!validator.isEmail(email)){
        console.log('this true');
        throw new Error('use valid email')
      } 
      
      const user = await User.findOne({email})
      if(user){
        throw new Error('Somebody already use this email')
      }

      await User.create(req.body)

      const token = jwt.sign({email}, jwt_secret)
      
      res.status(201).json({
        success: true,
        message: 'success to create data',
        token
      })
    }
    catch(err){
      res.status(400).json({
        success: false,
        message: err.message,
      })
    }
  },
  async login(req, res, next){
    try {
      const { email, password } = req.body
      const user = await User.findOne({email})
      if(!user){
        throw new Error('user not found')
      }

      const isPasswordValid = await user.verifyPassword(password)
      if(!isPasswordValid){
        throw new Error('password invalid')
      }
      res.status(200).json({
        success: true,
        message: 'success login'
      })
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err.message
      }) 
    }
  }
}