const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const uploadRoutes = require('./routes/uploadRoutes');
const PORT = process.env.PORT || 3000;
const fileUpload = require('express-fileupload');
const {cloudinaryConnect} = require('./config/cloudinary');

connectDB();
cloudinaryConnect();

const app = express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./parthtemp/"
}));

app.get('/', (req, res) => {
    res.status(200).send("<h1>File Uploading...</h1>");
});

app.post('/test', (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        success: true
    })
});

app.use('/api/v1/upload', uploadRoutes);

app.listen(PORT, () => {
    console.log('App is listening on port no: ', PORT);
});
