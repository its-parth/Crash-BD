const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', async (req, res) => {
    res.status(200).send("<h1>Parth Magar</h1>")
});

app.listen(PORT, () => {
    console.log(`App is listening on PORT no ${PORT}`);
})