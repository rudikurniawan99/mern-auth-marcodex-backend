const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true
  },
  products: {
    type: [
      {
        product_id: {
          type: ObjectId,
          required: true
        },
        total: {
          type: Number,
          required: true
        }
      }
    ],
    required
  }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart