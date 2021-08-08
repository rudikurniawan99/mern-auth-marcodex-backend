const { User, Cart } = require('../models')
const validator = require('validator')
const { generateToken } = require('../utils')


module.exports = {
  async register(req, res){
    try{
      const { email, password, fullname} = req.body

      if(!validator.isEmail(email)){
        throw new Error('use valid email')
      } 
      const user = await User.findOne({email})
      if(user){
        throw new Error('Somebody already use this email')
      }

      const newUser = await User.create({
        email,
        password,
        fullname,
      })


      //create cart
      const cart = await Cart.create({
        user_id: newUser.id,
        products: []
      })

      if(!cart){
        throw new Error('failed to create cart')
      }
      
      const token = await generateToken({
        id : newUser.id,
      })

      res.status(201).json({
        success: true,
        message: 'success to create user and cart',
        token,
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

      const token = await generateToken({id: user.id}) 
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
    const page = parseInt(req.query.page) || 1
    const itemLimit = parseInt(req.query.itemLimit) || 5

    try{
      const users = await User.find()
        .skip((page-1) * itemLimit)
        .limit(itemLimit)

      res.status(201).json({
        success: true,
        message: 'get users',
        data: users,
      })
    }
    catch(err){
      res.status(403).json({
        success: false,
        message: err.message
      })

    }
  },
  async getUser(req, res, next){
    const id = req.params.id

    try {
      const user = await User.findById(id) 
      if(!user){
        throw new Error('User not find')
      }

      res.status(201).json({
        success: true,
        message: 'success to get data',
        data: user.email
      })
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message
      }) 
    }
  },
  async updateUser(req, res, next){
    const { email, password } = req.body
    const id = req.params.id

    try {
      const user = await User.findByIdAndUpdate(id ,{
        email,
        password
      },{
        useFindAndModify: false
      }
      )
      if(!user){
        throw new Error('cant find user')
      }

      res.status(201).json({
        success: true,
        message: 'succes to update'
      })


    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      }) 
    }
  },
  async deleteUser(req, res, next){
    const id = req.params.id

    try {
      const user = await User.findByIdAndDelete(id)
      
      res.status(201).json({
        success: true,
        message: 'success to delete user'
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      })
    }
  }
}