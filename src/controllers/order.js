const { Cart, Order, Product, User } = require('../models')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/User')

module.exports = {
  async createOrder(req, res){
    const { token } = req.headers
    const user_id = jwt.decode(token).id
    const { shipping_address } = req.body

    try {
      const user = await User.findById(user_id)

      const cart = await Cart.findOne({
        user_id
      })      

      const productsInCart = cart.products
      if(!productsInCart){
        throw new Error('product is empty')
      }

      let amount = 0
      const countAmount = productsInCart.map( async (product) => {
        const prod = await Product.findById(product.product_id)
        const price = prod.price
        amount += price*product.total
      })
      await Promise.all(countAmount)

      const order = await Order.create({
        user_id,
        amount,
        shipping_address,
        products: productsInCart,
        order_email: user.email,
      })

      res.status(201).json({
        success: true,
        data: order
      })
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      })      
    }
  }, 
  async getOrder(req, res){
    const { id } = req.params

    try {
      const order = await Order.findById(id)      
      if(!order){
        throw new Error('the order doesnt exist')
      }

      res.status(201).json({
        success: true,
        message: 'success to get order',
        data: order
      })
      
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }
  },
  async getOrders(req, res){
    const { token } = req.headers
    const page = req.query.page || 1
    const itemLimit = req.query.itemLimit || 3

    try {
      const user_id = jwt.decode(token).id

      const orders = await Order.find({
        user_id
      })
        .skip((page-1)* itemLimit)
        .limit(itemLimit)
        .sort({createdAt: 'desc'})

      res.status(201).json({
        success: true,
        message: 'success to get all orders',
        data: orders
      })
      

    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }  
  },
  async deleteOrder(req, res){
    const { id } = req.params

    try {
      const order = await Order.findById(id)
      const deletedOrder = order
      await Order.deleteOne(order)

      res.status(201).json({
        success: true,
        message: 'success to delete order',
        data: deletedOrder
      })

    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }
  }
}