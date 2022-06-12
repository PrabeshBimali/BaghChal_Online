const router = require('express').Router()
const upload = require('../config/uploadImage')
const { createNewBlog, getAllBlogs, getBlogDetail, getMyBlogs, deleteBlog } = require('../controllers/blogController')
const { isAuthenticatedMiddleware } = require('../controllers/authController')
const validateBlog = require('../controllers/blog/validateBlog')
const {postComment, getCommentsById, deleteComment} = require('../controllers/commentController')


router.post('/create', isAuthenticatedMiddleware, upload.single("file"), validateBlog, createNewBlog)
router.get('/all', getAllBlogs)
router.get('/my', isAuthenticatedMiddleware, getMyBlogs)
router.get('/detail', getBlogDetail)
router.delete('/delete', isAuthenticatedMiddleware, deleteBlog)
router.post('/comment/post', isAuthenticatedMiddleware, postComment)
router.get('/comment/all', getCommentsById)
router.delete('/comment/delete', isAuthenticatedMiddleware, deleteComment)

module.exports = router