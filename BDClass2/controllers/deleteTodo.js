const Todo = require('../models/Todo');

const deleteTodo = async (req, res) => {
    
    try {
        const {id} = req.params;
        const response = await Todo.findByIdAndDelete(id);
        if(!response) {
            return res.status(404).json({
                success: false,
                message: 'Id is not valid!',
            });
        }
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Todo deleted Successfully!'
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

module.exports = {deleteTodo}