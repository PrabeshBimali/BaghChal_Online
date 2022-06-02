const router = require('express').Router()
const upload = require('../config/uploadImage')
const { createNewBlog, getAllBlogs, getBlogDetail, getMyBlogs, deleteBlog } = require('../controllers/blogController')
const { isAuthenticatedMiddleware } = require('../controllers/authController')
const validateBlog = require('../controllers/blog/validateBlog')


router.post('/create', isAuthenticatedMiddleware, upload.single("file"), validateBlog, createNewBlog)
router.get('/all', getAllBlogs)
router.get('/my', isAuthenticatedMiddleware, getMyBlogs)
router.get('/detail', getBlogDetail)
router.delete('/delete', deleteBlog)

module.exports = router