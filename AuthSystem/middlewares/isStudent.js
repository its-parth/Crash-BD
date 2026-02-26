
exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== 'student') {
            return res.status(403).json({
                succcess: false,
                message: 'Access Denied!'
            });
        }
        next();
    }catch(err) {

    }
}