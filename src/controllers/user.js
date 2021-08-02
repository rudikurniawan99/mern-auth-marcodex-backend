const { User } = require('../models')
const validator = require('validator')
const { generateToken } = require('../utils')


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

      const token = await generateToken({email})
      
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
        throw new Error(`password doesn't match with email`)
      }

      const token = await generateToken({email}) 
      res.status(200).json({
        success: true,
        message: 'success login',
        token: token
      })
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err.message
      }) 
    }
  },
  async getUsers(req, res, next){
    try{
      const users = await User.find()

      res.status(201).json({
        success: true,
        message: 'get all data',
        data: users
      })
    }
    catch(err){
      res.status(403).json({
        success: false,
        message: err.message
      })

    }
  }
}