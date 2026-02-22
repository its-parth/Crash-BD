const express = require('express');
const router = express.Router();
const {createPost, getPosts} = require('../controllers/postController');
const { createComment } = require('../controllers/commentController');
const { likePost, unlikePost } = require('../controllers/likeController');

router.post('/posts/create', createPost);
router.get('/posts', getPosts);

router.post('/comments/create', createComment);

router.post('/likes/like', likePost);
router.delete('/likes/unlike', unlikePost);

module.exports = router;