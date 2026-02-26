exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== 'admin') {
            return res.status(403).json({
                succcess: false,
                message: 'Access Denied!'
            });
        }
        next();
    }catch(err) {

    }
}