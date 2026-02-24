const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.status(200).send("<h1>Parth Magar</h1>")
});

app.use('/api/v1/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`App is listening on PORT no ${PORT}`);
})