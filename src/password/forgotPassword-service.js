const crypto = require('crypto');
const { PW_RESET_CRYPTO_PASS } = require("../config")
const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require("../config")

const ForgotPasswordService = {
    insertTempPassword(db, email, hash) {
        return db('users')
            .where('email', '=', email)
            .update({
                temppass: hash
            })
            .returning('*')
            .then(([user]) => user)
    },

    checkTempPassValid(db, email) {
        return db('users')
            .where('email', '=', email)
            .returning('temppass')
            .then(([user]) => user.temppass)
    },

    clearTempPassword(db, email) {
        return db('users')
            .where('email', '=', email)
            .update({
                temppass: ""
            })
            .returning('*')
            .then()
    },


    encryptUser(username) {
        const algorithm = 'aes-192-cbc';
        const password = PW_RESET_CRYPTO_PASS;
        // Use the async `crypto.scrypt()` instead.
        const key = crypto.scryptSync(password, 'salt', 24);
        // Use `crypto.randomBytes` to generate a random iv instead of the static iv
        // shown here.
        const iv = Buffer.alloc(16, 0); // Initialization vector.

        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(username, 'utf8', 'hex');
        let p1 =  new Promise((resolve, reject) => {
            let hash = encrypted += cipher.final('hex')

            if (!hash) {
                reject(new Error('Error generating hash'))
            }
            resolve(hash)
        });

        return p1
    },

    decryptUser(hash) {
        const algorithm = 'aes-192-cbc';
        const password = PW_RESET_CRYPTO_PASS;
        // Use the async `crypto.scrypt()` instead.
        const key = crypto.scryptSync(password, 'salt', 24)
        // The IV is usually passed along with the ciphertext.
        const iv = Buffer.alloc(16, 0); // Initialization vector.
    
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
        // Encrypted using same algorithm, key and iv.
        let decrypted = decipher.update(hash, 'hex', 'utf8');
        return new Promise((resolve, reject) => {
            let userEmail = decrypted += decipher.final('utf8')
            
            if (!userEmail) {
                reject(new Error('Error decrypting'))
            }   
            resolve(userEmail)
        })
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

    sendResetEmail(user) {
        const mailjet = require ("node-mailjet")
        .connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)
        const { first_name, temppass, email} = user

        const request = mailjet
            .post("send", {"version": "v3.1"})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": "info@lakeshowtix.com",
                            "Name": "Lakeshow Tickets"
                        },
                        "To": [
                            {
                                "Email": `${email}`,
                                "Name": `${first_name}`
                            }
                        ],
                        "Bcc": [
                            {
                                "Email": "matt.friedberg@gmail.com",
                                "Name": "Lakeshow Tickets Sale"  
                            }
                        ],
                        "TemplateID": 1090966,
                        "TemplateLanguage": true,
                        "Subject": "Lakeshow Tickets - Password Reset",
                        "Variables": {
                            "firstname": `${first_name}`,
                            "temppass": `${temppass}`,
                        }
                    }
                ]
            })

        return request
            .then(result => {
                return ({ 
                    statusCode: 200,
                    message: "Email sent" 
                })
            })
            .catch(err => {
                return ({ 
                    statusCode: err.statusCode, 
                    message: err.ErrorMessage 
                })
            })
    }
}

module.exports = ForgotPasswordService



 