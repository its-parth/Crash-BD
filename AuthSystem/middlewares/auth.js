const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = decoded;
        next();    
    } catch(err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Credentials',
        });
    }
}