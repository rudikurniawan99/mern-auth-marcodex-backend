const router = require('express').Router()
const { createCart } = require('../controllers/cart')

router.post('/create',  createCart)

module.exports = router