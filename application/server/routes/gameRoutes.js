const router = require("express").Router()
const {getAllGames} = require('../controllers/gameController')
const { isAuthenticatedMiddleware } = require('../controllers/authController')

router.get('/all', isAuthenticatedMiddleware, getAllGames)

module.exports = router