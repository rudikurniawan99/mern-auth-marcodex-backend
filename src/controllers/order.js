const { Cart, Order, Product } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  async createOrder(req, res){
    const { token } = req.headers
    const user_id = jwt.decode(token).id
    const { shipping_adress } = req.body

    try {
      const user = await User.findById(user_id)

      const cart = await Cart.findOne({
        user_id
      })      

      const products = cart.products
      if(!products){
        throw new Error('product is empty')
      }
      let amount = 0
      products.map( async (product) => {
        const price = await Product.findOne({
          product_id: product.product_id
        }).price
        amount+= price*product.total 
      })

      console.log(amount)
     
      // const order = await Order.create({
      //   user_id,
      //   amount,
      //   shipping_adress,
      //   products,
      //   order_email: user.email,
      // })

      res.status(201).json({
        success: true,
        // data: order

      })
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      })      
    }
  }
}