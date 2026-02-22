const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDB Connected successfully : ${conn.connection.host}`);
        
    }catch(err) {
        console.log(`Error while connecting to db: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;