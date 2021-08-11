const { Cart, User, Product} = require('../models')
const jwt = require('jsonwebtoken')
const { updateProduct } = require('./product')

module.exports = {
  async addToCart(req, res, next){
    
    try {
      const { product_id } = req.query
      const total = parseInt(req.body.total)
      const { token } = req.headers

      const user_id = jwt.decode(token).id
      const cart = await Cart.findOne({
        user_id
      })

      const product = await Product.findById(product_id)
      if(!product){
        throw new Error('product doesn\'t exist')
      } 

      const products = [
        {
          product_id,
          total
        }
      ].concat(cart.products)

      await cart.updateOne({
        products
      })

      res.status(201).json({
        success: true,
        message: 'success to add product to cart',
        data: cart,
      })
      
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e.message
      }) 
    }
  },
  async getCart(req, res){
    const { token } = req.headers
    const user_id = jwt.decode(token).id

    try {
      const cart = await Cart.findOne({
        user_id
      }) 

      res.status(201).json({
        success: true,
        message: 'succes to get cart',
        data: cart
      })

    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      })   
    }
  },

  async removeFromCart(req, res){
    const { product_id } = req.query
    const { token } = req.headers
    const user_id = jwt.decode(token).id

    try {
      const cart = await Cart.findOne({
        user_id
      }) 

      if(!cart){
        throw new Error('you dont have a cart, register first')
      }



      const products = cart.products.filter((value, index , arr) => {
        return value.product_id != product_id
      })
      // const products = cart.products

      const updatedCart = await cart.updateOne({
        products
      })


      res.status(201).json({
        success: true,
        message: 'success to update cart',
        data: updatedCart
      })


    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }
  }
}