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

exports.studentController = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'This is protected route for student'
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.adminController = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'This is protected route for admin'
        })
    }catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}