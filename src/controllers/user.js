const { User } = require('../models')

module.exports = {
  findById: (req, res) => {
    const { user } = req
    if(!user){
      res.status(400).json({
        success: false,
        message: `There is an issue on the server side`
      })  
      res.status(200).json({
        success: true,
        message: user
      })
    }
  },
  async register(req, res){
    try{

      const user = await User.create(req.body)
      
      res.status(201).json({
        success: true,
        data: user
      })
    }
    catch(err){
      res.status(400).json({
        success: false,
        message: err.message
      })
    }
  },
  async login(req, res, next){
    try {
      const { username, password } = req.body
      const user = await User.findOne({username})
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