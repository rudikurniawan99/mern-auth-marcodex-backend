const router = require('express').Router()
const multer = require('multer')

const { create, getProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product')
const { authorize } = require('../middleware/authorization')
const fileStorage = require('../config/fileStorage')

router.use(multer({storage: fileStorage}).single('thumbnail'))
router.post('/create', authorize, create)
router.get('/products', getProducts)
router.get('/:id', getProduct)
router.put('/:id', authorize, updateProduct)
router.delete('/:id', authorize, deleteProduct)

module.exports = router