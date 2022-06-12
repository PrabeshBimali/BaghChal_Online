const router = require('express').Router()
const { createNewForum, getAllForums, getMyForums, getForumDetail, deleteForum } = require('../controllers/forumController')
const { isAuthenticatedMiddleware } = require('../controllers/authController')
const {postReply, getRepliesById, deleteReply} = require("../controllers/replyController")
const validateForum = require('../controllers/forum/validateForum')


router.post('/create', isAuthenticatedMiddleware, validateForum, createNewForum)
router.get('/all', getAllForums)
router.get('/my', isAuthenticatedMiddleware, getMyForums)
router.get('/detail', getForumDetail)
router.delete('/delete', isAuthenticatedMiddleware, deleteForum)
router.post('/reply/post', isAuthenticatedMiddleware, postReply)
router.get('/reply/all', getRepliesById)
router.delete('/reply/delete', isAuthenticatedMiddleware, deleteReply)

module.exports = router