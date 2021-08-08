const router = require('express').Router()
const { createOrder } = require('../controllers/order')
const { authorize } = require('../middleware/authorization')


router.post('/create', authorize, createOrder)

module.exports = router