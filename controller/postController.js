const Post = require('../model/postModel');

const postController = {
    createPost: async (req, res) => {
        try {
            const { content } = req.body;
            const post = await Post.create({ content, author: req.user });
            res.status(201).json({ message: "Post Created successfully", data: post })
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: -1 });
            res.status(200).json({ message: `Posts fetched successfully`, data: posts });
        } catch (error) {
            res.status(500).json({ message: `Error in fetching posts.`, error })
        }
    },
    getMyPosts: async (req, res) => {
        try {
            const mypost = await Post.find({ 'author._id': req.user._id }).sort({ createdAt: -1 });
            res.status(201).json({ message: `Your posts fetched successfully`, data: mypost });
        } catch (error) {
            res.status(500).json({ message: `Error in fetching my posts.`, error });
        }
    },
    deletePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user._id;
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: `Post not found.` });
            //Only you can delete your post.
            if (post.author._id.toString() != userId) return res.status(401).json({ message: 'You are not authorized to delete this post', data: {postAuthorId: post.author._id, userId} })
            await Post.findByIdAndDelete(postId);
            res.json({ message: `Post deleted successfully` });
        } catch (error) {
            res.status(500).json({ message: `Error in deleting the post.`, error });
        }
    },
    likePost: async (req, res) => {
        const postId = req.params.postId;
        const userId = req.user._id;

        try {
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: "Post not found." });
            post.likes.push(userId);
            await post.save();
            res.status(201).json({ message: `Post liked successfully`, data: post });
        } catch (error) {
            res.status(500).json({ message: `Internal server error.`, error });
        }
    },
    dislikePost: async (req, res) => {
        const postId = req.params.postId;
        const userId = req.user._id;

        try {
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: "Post not found." });
            const likedIndex = post.likes.indexOf(userId);
            post.likes.splice(likedIndex, 1);
            await post.save();
            res.status(201).json({ message: "Post disliked successfully", data: post });
        } catch (error) {
            res.status(500).json({ message: `Internal server error.`, error });
        }
    },
    addComment: async (req, res) => {
        const postId = req.params.postId;
        const { text } = req.body;

        try {
            const post = await Post.findById(postId);
            const commentObj = { text, author: req.user };
            post.comments.push(commentObj);
            const savedPost = await post.save();
            const newComment = savedPost.comments[savedPost.comments.length - 1];
            res.json({ message: `Comment added successfully`, data: newComment });
        } catch (error) {
            res.status(500).json({ message: `Internal server error.`, error });
        }
    },
    deleteComment: async (req, res) => {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const userId = req.user._id;

        try {
            const post = await Post.findById(postId);
            if (!post) return res.status(404).json({ message: `Post not found.` });
            const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
            if (commentIndex === -1) return res.status(404).json({ message: `Comment not found.` });
            //Only the person who commented can delete the post.
            if (post.comments[commentIndex].author._id.toString() != userId) return res.status(401).json({ message: `You are not authorized to delete this comment.`, comment: post.comments[commentIndex] })
            const deletedComment = post.comments[commentIndex];
            post.comments.splice(commentIndex, 1);
            await post.save();
            res.json({ message: `Comment deleted successfully`, data: deletedComment });
        } catch (error) {
            res.status(500).json({ message: `Internal server error.`, error });
        }
    },
    testControl: async (req, res) => {
        try {
            res.json({message: "Server is running"})
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}

module.exports = postController;