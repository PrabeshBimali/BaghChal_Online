const router = require("express").Router()
const {registerUser, loginUser, isAuthenticated} = require('../controllers/authController')


router.post('/register', registerUser);
router.post("/login", loginUser);
router.get("/login", isAuthenticated);

module.exports = router;