const router = require('express').Router()
const { createOrder, deleteOrder, getOrder, getOrders } = require('../controllers/order')
const { authorize } = require('../middleware/authorization')


router.post('/create', authorize, createOrder)
router.delete('/delete', authorize, deleteOrder)
router.get('/:id', authorize, getOrder)
router.get('/', authorize, getOrders)
module.exports = router