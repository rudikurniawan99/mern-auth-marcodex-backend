const router = require('express').Router()

const { create, getProduct, getProducts, updateProduct, deleteProduct, deleteAll } = require('../controllers/product')
const { authorize } = require('../middleware/authorization')
const upload = require('../middleware/upload')

router.post('/create', authorize, upload.single('thumbnail') , create)
router.get('/products', getProducts)
router.delete('/delete-all', deleteAll)
router.get('/:id', getProduct)
router.put('/:id', authorize, upload.single('thumbnail'), updateProduct)
router.delete('/:id', authorize, deleteProduct)

module.exports = router