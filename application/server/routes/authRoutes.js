const router = require("express").Router()
const {registerUser, loginUser, isAuthenticated, logout} = require('../controllers/authController')


router.post('/register', registerUser);
router.post("/login", loginUser);
router.get("/login", isAuthenticated);
router.get("/logout", logout)

module.exports = router;