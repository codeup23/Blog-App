const express = require('express');
const { createPost, updatePost, getPosts, getPostById, deletePost } = require('../controllers/postController');
const { auth } = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/multer');

const router = express.Router();

router.post('/post', auth, uploadMiddleware.single('file'), createPost);
router.put('/post', auth, uploadMiddleware.single('file'), updatePost);
router.get('/post', getPosts);
router.get('/post/:id', getPostById);
router.delete('/delete/:id', auth, deletePost);

module.exports = router;
