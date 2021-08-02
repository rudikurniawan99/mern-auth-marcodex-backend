const router = require('express').Router()
const { register, login, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { authorize } = require('../middleware/authorization')

router.post('/register', register)
router.post('/login', login)

router.use('/users', authorize)
router.get('/users', getUsers)

router.get('/user/:id', getUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router
