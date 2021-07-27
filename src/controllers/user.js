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
  async login(req, res){
    try {
      res.status(200).json({
        success: true,
        message: 'success login'
      })
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message
      }) 
    }
  }
}