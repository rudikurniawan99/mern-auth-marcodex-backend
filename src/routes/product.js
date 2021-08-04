const router = require('express').Router()
const { create, getProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product')
const { authorize } = require('../middleware/authorization')

router.post('/create', authorize, create)
router.get('/products', getProducts)
router.get('/:id', getProduct)
router.put('/:id', authorize, updateProduct)
router.delete('/:id', authorize, deleteProduct)

module.exports = router