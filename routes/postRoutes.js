const express = require('express');
const postController = require('../controller/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/myPost', authMiddleware, postController.getMyPosts);
router.delete('/:postId', authMiddleware, postController.deletePost);

module.exports = router;