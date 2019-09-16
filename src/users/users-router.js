const express = require('express')
const path = require('path')
const UserService = require('./users-service')
const AuthService = require('../auth/auth-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, username, full_name, email } = req.body

        for (const field of ['full_name', 'username', 'password', 'email'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
        
        const passwordError = UserService.validatePassword(password)
        const db = req.app.get('db')

        if (passwordError)
                return res.status(400).json({ error: passwordError })

        UserService.hasUserWithUserName(db,username)
        .then(hasUserWithUserName => {
            if (hasUserWithUserName) {
                return res.status(400).json({
                    error: `Username already taken`
                })
            }
            return UserService.hasUserWithEmail(db, email)
            .then(hasUserWithEmail => {
                if (hasUserWithEmail) {
                    return res.status(400).json({
                        error: `Email has already been registered`
                    }) 
                }    
                return UserService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                        username,
                        password: hashedPassword,
                        full_name,
                        email,
                        date_created: 'now()'
                    }
                    return UserService.insertUser(db,newUser)
                    .then(user => {
                        const sub = username
                        const payload = { user_id: user.id }
                        const token = AuthService.createJwt(sub, payload)
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/tickets`))
                            .json({ authToken: token })
                            /* .json(UserService.serializeUser(user)) */
                    })
                })
            })
        })
        .catch(next)
    })

module.exports = usersRouter