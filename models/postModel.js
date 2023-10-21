const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        video: {
            type: String,
            require: [true, "Please add video link"]
        },
        creator: {
            type: String,
            require: [true, "Please add creator"]
        },
        likes: {
            type: Number,
            require: true, 
            default: 0,        
        },
        comments: {
            type: String,
            require: false,
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;