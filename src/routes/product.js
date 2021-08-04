const router = require('express').Router()
const { create, getProduct, getProducts } = require('../controllers/product')
const { authorize } = require('../middleware/authorization')

router.post('/create', authorize, create)
router.get('/products', getProducts)
router.get('/:id', getProduct)

module.exports = router