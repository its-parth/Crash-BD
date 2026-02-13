const mongoose = require('mongoose');
exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB connected successfully : "+conn.connection.host);
    }catch(err) {
        console.log(`Error : ${err.message}`);
        process.exit(1);
    }
};