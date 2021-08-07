const { Cart, User} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  async create(req, res, next){
    // const {  } = req.body
    
    try {
      const { product_id } = req.query
      const total = parseInt(req.body.total)
      const { token } = req.headers

      // cek user
      const decodedValue = jwt.decode(token)
      const user = await User.find({
        email: decodedValue.email
      })
      const user_id = user[0].id
      
      const cart = await Cart.create({
        user_id,
        products: [
          {
            product_id,
            total
          }
        ]
      })

      res.status(201).json({
        success: true,
        message: 'success to create cart',
        data: cart,
      })
      
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e.message
      }) 
    }
  }
}