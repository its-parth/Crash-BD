const Todo = require('../models/Todo');

const getAllTodos = async (req, res) => {
    try {        
        const response = await Todo.find({});
                
        res.status(200).json({
            success: true,
            data: response,
            message: 'All todos fetched successfully!',
        });
    }catch(err) {
        res.status(500).json({
            success : false,
            data : 'Internal server error',
            message : err.message,
        })
    }

}

const getTodoById = async (req, res) => {
    try {        
        const {id} = req.params || {};

        if(!id) {
            return res.status(400).json({
                success: false,
                data: undefined,
                message: 'id is required to pass!',
            })
        }

        const response = await Todo.findById(id);
        if(!response) {
            return res.status(404).json({
                success: false,
                data: undefined,
                message: 'Todo not found!',
            })
        }
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Todo fetched successfully by id',
        })

    }catch(err) {
        res.status(500).json({
            success: false,
            data : 'internal server error',
            message: err.message,
        })
    }
}

module.exports = {getAllTodos, getTodoById};