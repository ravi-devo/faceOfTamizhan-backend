const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            initial: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            place: {
                type: String,
                required: true
            }
        },
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        text: {
            type: String,
            required: true
        },
        author: {
            type: {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                initial: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                place: {
                    type: String,
                    required: true
                }
            },
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
},
{
    timestamps: true
}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;