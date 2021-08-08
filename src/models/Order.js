const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  },
  products: {
    type: [
      {
        product_id : {
          type: String,
          required: true
        },
        total: {
          type: Number,
          required: true
        }
      }
    ]
  },
  order_email: {
    type: String,
    required: true
  },
  order_date: {
    type: Date,
    default: new Date().getTime(),
    required: true
  },
  order_status: {
    type: String,
    required: true
  }
})