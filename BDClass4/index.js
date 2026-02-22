const express = require('express');
const app = express();
const connectDB = require('./config/database')
const blogRoutes = require('./routes/blogRoutes');

require('dotenv').config();
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('<h1>Parth Magar</h1>');
});

app.use('/api/v1', blogRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`App is listening on port ${process.env.PORT || 4000}`);
})