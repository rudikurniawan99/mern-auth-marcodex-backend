const { Product } = require('../models')

module.exports = {
  async create(req, res){
    const { name, category, description } = req.body

    try {
      const product = await Product.create({
        name,
        category,
        description
      })

      res.status(201).json({
        success: true,
        message: 'succes create new product',
        data: product
      })
      
    } catch (err) {
      res.status(403).json({
        success: false,
        message: err.message
      }) 
    }
  },
  async getProduct(req, res, next){
    const { id } = req.params

    try {
      const product = await Product.findById(id)

      res.status(201).json({
        success: true,
        message: 'success to get product',
        data: product
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      }) 
    }
  }
}