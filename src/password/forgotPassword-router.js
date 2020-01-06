const express = require('express')
const UserService = require('../users/users-service')
const ForgotPasswordService = require('./forgotPassword-service')


const forgotPasswordRouter = express.Router()
const jsonBodyParser = express.json()

forgotPasswordRouter.post('/forgot', jsonBodyParser, (req, res, next) => {
    const { email } = req.body

    if (!email)
        return res.status(400).json({
            error: `Email must be provided`
        })
    
    const db = req.app.get('db')
    
    UserService.hasUserWithEmail(db, email)
        .then(hasUserWithEmail => {
            if (!hasUserWithEmail) {
                return (
                    res
                        .status(400)
                        .json({ error: `That email could not be found` })     
                )}
            ForgotPasswordService.encryptUser(email)
                .then(value => {
                    return value
                })
                .then(hash => {
                    return ForgotPasswordService.insertTempPassword(db, email, hash)
                })
                .then(user => {
                    return ForgotPasswordService.sendResetEmail(user)
                })
                .then(email => {
                    return res
                        .status(email.statusCode)
                        .json({ message: email.message })
                }) 
        })
        .catch(next)
})

forgotPasswordRouter.get('/reset/:temppass', (req, res, next) => {
    let { temppass } = req.params

    const db = req.app.get('db')

    ForgotPasswordService.decryptUser(temppass)
        .then(userEmail => {
            if (!userEmail) {
                return res.status(400).json({
                    error: `The temp link is no longer valid. Please try resetting your password again.`
                })
            }
            ForgotPasswordService.checkTempPassValid(db, userEmail)
            .then(hash => {
                if (!hash) {
                    return res.status(400).json({
                        error: `The temp link is no longer valid. Please try resetting your password again`
                    })
                }
                return res
                    .status(201)
                    .location(`/reset-password`)
                    .json({ 
                        userEmail: userEmail,
                        tempPass: temppass
                     })
            })
        })
        .catch(next)
})

forgotPasswordRouter.post('/reset_password', jsonBodyParser, (req, res, next) => {
    const { email, password, tempPass } = req.body

    if (!password)
        return res.status(400).json({
            error: `Missing password in request body`
        })
    
    const passwordError = UserService.validatePassword(password)
    const db = req.app.get('db')

    if (passwordError)
        return res.status(400).json({ error: passwordError })

    UserService.hashPassword(password)
        .then(hashedPassword => {
            ForgotPasswordService.checkTempPassValid(db, email)
            .then(tempPass => {
                if (!tempPass) {
                    return res.status(400).json({ error: `The temp link is no longer valid. Please try resetting your password again.` })
                }
                ForgotPasswordService.clearTempPassword(db, email)
                .then(user => {
                    UserService.resetPassword(db, email, hashedPassword)
                    .then(user => {
                        return res
                            .status(201)
                            .json({
                                message: "Password has been successfully reset"
                            })
                    })
                })
            })
        })
        .catch(next)
})

forgotPasswordRouter.post('/confirm_creds', jsonBodyParser, (req, res, next) => {
    const { email, tempCreds } = req.body

    if (!email)
        return res.status(400).json({
            error: `Missing email in request body`
        })
    
    ForgotPasswordService.decryptUser(tempCreds)
        .then(creds => {
            if (email != creds) {
                return res.status(400).json({
                    error: `Credentials do not match. Please reset password again.`
                })
            }
            return res
                .status(201)
                .json({
                    message: "Please reset password"
                })
        })
        .catch(next) 
})


module.exports = forgotPasswordRouter