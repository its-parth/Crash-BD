const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, body, user, mobileNo } = req.body;
        if (!title?.trim() || !body?.trim() || !user?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }
        const response = await Post.create({ title, body, user, mobileNo });
        return res.status(201).json({
            success: true,
            message: 'Post created successfully!',
            data: response
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const response = await Post.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: response.length ? 'Post Fetched Successfully!' : 'No posts found',
            data: response,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = { createPost, getPosts };