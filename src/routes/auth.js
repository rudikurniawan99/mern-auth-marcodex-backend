const router = require('express').Router()
const { register, login, getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const { authorize } = require('../middleware/authorization')

router.post('/register', register)
router.post('/login', login)

router.get('/users', authorize, getUsers)

router.get('/user/me', getUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router
