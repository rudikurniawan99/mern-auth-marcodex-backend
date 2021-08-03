const router = require('express').Router()
const { create, getProduct } = require('../controllers/product')
const { authorize } = require('../middleware/authorization')

router.post('/create', authorize, create)
router.get('/:id', getProduct)

module.exports = router