const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Parth Magar</h1>");
})

app.listen(4000, () => {
    console.log('App is listening on port 4000');
    
})