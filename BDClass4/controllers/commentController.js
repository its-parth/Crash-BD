const Post = require("../models/Post");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const createComment = async(req, res) => {
    try {
        const {post, user, body} = req.body;
        if(!post || !user?.trim() || !body?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            })
        }
        if(!mongoose.Types.ObjectId.isValid(post)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID'
            });
        }
        const userPost = await Post.findById(post);
        if(!userPost) {
            return res.status(422).json({
                success: false,
                message: "Post does not exist",
            })
        }
        const comment = await Comment.create({ post, user, body });

        await Post.findByIdAndUpdate(
            post, 
            { $push: { comments: comment._id }}, 
        );

        return res.status(201).json({
            success: true,
            message: 'comment created successfully',
            data: comment
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        })
    }
}

module.exports = {createComment}