const router = require('express').Router()
const { create } = require('../controllers/cart')

router.post('/create',  create)

module.exports = router