const express = require('express');
const postController = require('../controller/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/myPost', authMiddleware, postController.getMyPosts);
router.delete('/:postId', authMiddleware, postController.deletePost);

//Like and dislike Post
router.post('/:postId/like', authMiddleware, postController.likePost);
router.post('/:postId/dislike', authMiddleware, postController.dislikePost);

module.exports = router;