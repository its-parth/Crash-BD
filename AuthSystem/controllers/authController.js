const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
exports.signup = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        // note that we are getting role from user body and save it what if someone update the req and send role as admin then u create admin and give all access to him u stupid so here it is okay to understand functionality but u must handle this by using allowedRoles = ["student", "instructor"] and if it not includes in that role then return response also we can handle in multiple way read on chatgpt

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
        const user = await User.create({name, email: email.trim().toLowerCase(), password:hashedPassword, role});
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
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            });
        }

        // check that user exist or not
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(!existingUser) {
            return res.status(404).json({
                success: false,
                // don't tell them user not exist so hacker get know which are valid and which are not valid emails
                message: 'Invalid Credentials'
            });
        }

        // if user exist check password
        const isMatched = await bcrypt.compare(password, existingUser.password);
        if(!isMatched) {
            return res.status(401).json({
                success: false,
                // message: 'Incorrect password',
                message: 'Invalid Credentials'
            });
        }

        // if password matched return jwt token
        const userObj = existingUser.toObject();
        delete userObj.password;
        const payload = {
            id: userObj._id,
            email: userObj.email,
            role: userObj.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"7d"});
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            token
        })
    }catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error In Login'
        });
    }
}