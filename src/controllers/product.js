const { Product } = require('../models')
const { removeImageFile } =require('../utils')

module.exports = {
  async create(req, res){
    const { name, category, description, stock, price } = req.body
    const thumbnail = req.file.path 
    console.log(req.file)

    try {
      const product = await Product.create({
        name,
        category,
        description,
        stock,
        price: parseInt(price),
        thumbnail
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
  },
  async getProducts(req, res){
    const page = parseInt(req.query.page) || 1
    const itemLimit = parseInt(req.query.itemLimit) || 5

    try {
      const products = await Product.find()
        .skip((page-1) * itemLimit) 
        .limit(itemLimit)
        .sort({createdAt: 'desc'})

      res.status(201).json({
        success: true,
        message: 'succes to get data',
        data: products
      })

    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      })
    }
  },
  async updateProduct(req, res){
    const { name, category, description, stock, price } = req.body
    const { id } = req.params

    console.log(name, category, description, id);

    try {
      const product = await Product.findByIdAndUpdate(id, {
        name,
        category,
        description,
        stock,
        price: parseInt(price),
      },{
        useFindAndModify: false
      }) 

      res.status(201).json({
        success: true,
        message: 'success to edit product',
        data: product
      })
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }
  },
  async deleteProduct(req, res){
    const { id } = req.params

    try {
      const product = await Product.findById(id) 
      removeImageFile(product.thumbnail)

      await Product.findByIdAndDelete(id)

      res.status(201).json({
        success: true,
        message: 'success to delete product',
        data: product
      })
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }
  },
  async deleteAll(req, res){
    try {
      const products = await Product.deleteMany()

      res.status(201).json({
        success: true,
        message: 'success to delete all product',
      })
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message
      }) 
    }
  }
}