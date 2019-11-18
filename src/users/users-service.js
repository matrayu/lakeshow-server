const xss = require('xss')
const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UserService = {
    hasUserWithUserName(db, username) {
        return db('users')
            .where({ username })
            .first()
            .then(user => !!user)
    },

    getUserNameAndEmail(db, id) {
        return db('users')
            .where({ id })
            .first()
            .then(user => {
                return user
            })
    },

    hasUserWithEmail(db, email) {
        return db('users')
            .where({ email })
            .first()
            //.returning('*')
            .then(email => !!email)
    },

    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    },

    resetPassword(db, email, hashedPassword) {
        return db('users')
            .where('email', '=', email)
            .update({
                password: hashedPassword,
                date_modified: 'now()'
            })
            .returning('*')
            .then(user => user)
    },

    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }

        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }

        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password))
            return 'Password must contain 1 upper case, lower case, number and special character'
    },

    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },

    serializeUser(user) {
        return {
            id: user.id,
            first_name: xss(user.first_name),
            last_name: xss(user.last_name),
            username: xss(user.username),
            email: user.email,
            gender: user.gender,
            dob: user.dob,
            date_created: new Date(user.date_created),
        }
    }

}

module.exports = UserService