const router = require('express').Router()
const { createCart, getCart, removeFromCart } = require('../controllers/cart')
const { authorize } = require('../middleware/authorization')

router.post('/create',authorize, createCart)
router.delete('/delete', authorize, removeFromCart)
router.get('/', authorize, getCart)

module.exports = router