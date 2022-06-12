const router = require("express").Router()
const {findUserByUsername, getUserDetail} = require('../controllers/userController')
const { isAuthenticatedMiddleware } = require('../controllers/authController')


router.get('/finduser', findUserByUsername)
router.get('/profile', isAuthenticatedMiddleware, getUserDetail)

module.exports = router