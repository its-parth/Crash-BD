const express = require('express');
const router = express.Router();

// importing controllers
const {createTodo} = require('../controllers/createTodo')
const {getTodoById, getAllTodos} = require('../controllers/getTodo')
const {updateTodo} = require('../controllers/updateTodo');
const {deleteTodo} = require('../controllers/deleteTodo');

// mappting controllers with routes
router.post('/createTodo', createTodo);
router.get('/todos', getAllTodos);
router.get('/todos/:id', getTodoById);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router;