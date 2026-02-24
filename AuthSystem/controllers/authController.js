const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.signup = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        // normal validation
        if(!name?.trim() || !email?.trim() || !role?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'All Fields Are Required',
            });
        }

        // chech user already exist
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exist'
            })
        }

        // if user not exist hash the pass using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email: email.toLowerCase(), password:hashedPassword, role});
        const userObj = user.toObject();
        delete userObj.password;
        return res.status(201).json({
            success: true, 
            message: 'User registered Successfully',
            user: userObj
        });
    }catch(err) {
        console.error(err);
        
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error In Sign up'
        });
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error In Login'
        });
    }
}