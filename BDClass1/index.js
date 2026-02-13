const express = require('express');
const {connectDB} = require('./config');
const app = express();
require('dotenv').config();
connectDB();
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log('App started on port no 3000');
    
});

app.get('/', (req, res) => {
    res.send("Hello Jee, kaise ho saare");
});

app.post('/bikes/', (req, res) => {    
    const {name, company} = req.body || {};
    if(!name || !company) {
        return res.status(400).json({
            success: false,
            message: 'Please provide Bike name and company!!'
        });
    }
    console.log(`Bike name is : ${name}`);
    console.log(`Bike company is : ${company}`);
    
    res.send(`${company} Bikes are very good and ${name} this model is superb!`);
})