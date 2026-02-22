const mongoose = require('mongoose');
const Like = require('../models/Like');
const Post = require('../models/Post');

const likePost = async (req, res) => {
    try {
        const {post, user} = req.body;
        if(!post || !user?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            });
        }
        if(!mongoose.Types.ObjectId.isValid(post)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid object id of post',
            })
        }
        const userPost = await Post.findById(post);
        if(!userPost) {
            return res.status(422).json({
                success: false,
                message: 'Post does not exist'
            });
        }
        const alreadyLiked = await Like.findOne({ post, user });
        if(alreadyLiked) {
            return res.status(409).json({
                success: false,
                message: 'Post liked already'
            })
        }
        const like = await Like.create({post, user});
        const response = await Post.findByIdAndUpdate(
            post, 
            { $push: { likes: like._id }},
            { new: true }
        ).populate("comments").populate("likes").exec();

        return res.status(201).json({
            success: true,
            message: 'post liked successfully!',
            data: response
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error!'
        })
    }
}

const unlikePost = async (req, res) => {
    try {
        const {post, like} = req.body;
        if(!post || !like) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!',
            });
        }
        if(!mongoose.Types.ObjectId.isValid(post) || !mongoose.Types.ObjectId.isValid(like)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid object id of post or like',
            })
        }
        const userPost = await Post.findById(post);
        if(!userPost) {
            return res.status(422).json({
                success: false,
                message: 'Post does not exist'
            });
        }
        const likeOfPost = await Like.findById(like);
        if(!likeOfPost) {
            return res.status(422).json({
                success: false,
                message: 'Like does not exist',
            });
        }
        await Like.findByIdAndDelete(like);
        const response = await Post.findByIdAndUpdate(
            post, 
            { $pull: { likes: like }},
            { new: true }
        ).populate("likes").exec();

        return res.status(200).json({
            success: true,
            message: 'post unliked successfully!',
            data: response
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error!'
        })
    }
}

module.exports = { likePost, unlikePost }