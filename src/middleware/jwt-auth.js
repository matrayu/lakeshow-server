const AuthService = require('../auth/auth-service')

function requireAuth(req, res, next) {

    const authToken = req.get('Authorization') || ''

    let bearerToken

    if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(403).json({ error: 'Missing bearer token' })
    }
        
    bearerToken = authToken.slice(7, authToken.length)
    let payload
    

    try {
        payload = AuthService.verifyJwt(bearerToken)
    } catch(err) {
        return res.status(403).json({ error: 'Failed to authenticate token' })
    }
    
    res.admin = payload.admin
    next()

}

module.exports = {
    requireAuth,
}