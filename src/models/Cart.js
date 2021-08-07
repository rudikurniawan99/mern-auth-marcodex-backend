const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  products: {
    type: [
      {
        product_id: {
          type: String,
          required: true
        },
        total: {
          type: Number,
          required: true
        }
      }
    ],
    required: true
  }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart