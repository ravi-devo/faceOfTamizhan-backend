const Post = require('../model/postModel');

const postController = {
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;
            await Post.create({ title, content, author: req.user._id });
            res.status(201).json({ message: "Post Created successfully.", data: { title, content, author: req.user._id } })
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find();
            res.status(201).json({ message: `Posts fetched successfully.`, data: posts });
        } catch (error) {
            res.status(500).json({ message: `Error in fetching posts.`, error })
        }
    },
    getMyPosts: async (req, res) => {
        try {
            const mypost = await Post.find({ author: req.user._id });
            res.status(201).json({ message: `Your posts fetched successfully.`, data: mypost });
        } catch (error) {
            res.status(500).json({ message: `Error in fetching my posts.`, error });
        }
    },
    deletePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            await Post.findByIdAndDelete(postId);
            res.json({ message: `Post deleted successfully.` });
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
            if (post.likes.includes(userId)) return res.status(400).json({ message: `You already liked a post.` });
            post.likes.push(userId);
            await post.save();
            res.status(201).json({ message: `Post liked successfully.`, data: post });
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
            if(!post.likes.includes(userId)) return res.status(400).json({message: "Post not liked to dislike."});
            const likedIndex = post.likes.indexOf(userId);
            post.likes.splice(likedIndex, 1);
            await post.save();
            res.status(201).json({message: "Post disliked successfully", data: post});
        } catch (error) {
            res.status(500).json({ message: `Internal server error.`, error });
        }
    }
}

module.exports = postController;