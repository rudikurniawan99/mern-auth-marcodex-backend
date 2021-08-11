const router = require('express').Router()
const { addToCart, getCart, removeFromCart } = require('../controllers/cart')
const { authorize } = require('../middleware/authorization')

router.post('/create',authorize, addToCart)
router.delete('/delete', authorize, removeFromCart)
router.get('/', authorize, getCart)

module.exports = router