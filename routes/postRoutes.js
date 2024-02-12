const express = require('express');
const postController = require('../controller/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//Create, get and delete post routes
router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/myPost', authMiddleware, postController.getMyPosts);
router.delete('/:postId', authMiddleware, postController.deletePost);

//Like and dislike post routes
router.post('/:postId/like', authMiddleware, postController.likePost);
router.post('/:postId/dislike', authMiddleware, postController.dislikePost);

//Comment routes
router.post('/:postId/comment', authMiddleware, postController.addComment);
router.delete('/:postId/comment/:commentId', authMiddleware, postController.deleteComment);

module.exports = router;