module.exports = function checkAdminPrivledges (req, res, next) {
    if (!res.admin) {
        return res.status(403).json({
            success: false,
            status: 403,
            message: 'Unauthorized.'
          }); 
    }
    next()
}