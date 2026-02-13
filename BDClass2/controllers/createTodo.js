// import model 
const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    try {
        const {title, description} = req.body;
        const response = await Todo.create({title, description});
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Todo Created Successfully!!',
        })
    }catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: 'internal server error',
            message: err.message,
        })        
    }
}

module.exports = {createTodo};