const router = require('express').Router()
const { register, login, getUsers } = require('../controllers/user')
const { authorize } = require('../middleware/authorization')

router.post('/register', register)
router.post('/login', login)

router.use('/users', authorize)
router.get('/users', getUsers)

module.exports = router
