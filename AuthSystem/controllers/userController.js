const User = require('../models/User');

exports.test = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'You Accessed Protected Route'
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}