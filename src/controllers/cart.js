const { Cart, User} = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  async createCart(req, res, next){
    
    try {
      const { product_id } = req.query
      const total = parseInt(req.body.total)
      const { token } = req.headers

      const decodedValue = jwt.decode(token)
      const user = await User.findById(decodedValue.id)

      const cart = await Cart.create({
        user_id: user.id,
        products: [
          {
            product_id,
            total
          }
        ]
      })

      console.log(cart.id)


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