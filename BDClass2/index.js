const express = require('express');
const app = express();
require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/database');

app.use(express.json());

connectDB();

app.use('/api/v1', todoRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log('App is listening on port '+(process.env.PORT || 4000));
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>Parth Magar Is Learning Backend</h1>')
});