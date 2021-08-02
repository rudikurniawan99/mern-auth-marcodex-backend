const express = require('express')
const auth = require('./auth')
const { authorize } = require('../middleware/authorization')

const router = express.Router()

router.use('/users', authorize)
router.use('/auth', auth,)
// router.use('/product', )

module.exports = router