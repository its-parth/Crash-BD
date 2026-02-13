const Todo = require('../models/Todo');

const updateTodo = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        if(!id) {
            return res.status(400).json({
                success: false,
                message: 'Id is required!',
            })
        }
        // const updatedData = {};
        // if(title) updatedData.title = title;
        // if(description) updatedData.description = description;
        const updatedData = {
            ...(title && {title}),
            ...(description && {description})
        }
        const response = await Todo.findByIdAndUpdate(id, updatedData, {new: true});
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Todo updated successfully!',
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports = {updateTodo}