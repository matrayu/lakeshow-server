const express = require('express')
/* const paypal = require('paypal-rest-sdk') */
/* const { PAYPAL_CID, PAYPAL_SECRET } = require('../config') */
const PaymentService = require('./payment-service')
const { requireAuth } = require('../middleware/jwt-auth')

const paymentRouter = express.Router()
const jsonBodyParser = express.json()

// configure paypal with the credentials you got when you created your paypal app
/* paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': PAYPAL_CID, // please provide your client id here 
    'client_secret': PAYPAL_SECRET // provide your client secret here 
}); */
  
  

// start payment process
paymentRouter
    .post('/', requireAuth, jsonBodyParser, (req, res, next) => {
        const user_id = req.user.id
        const { transactions } = req.body
        const db = req.app.get('db')
        console.log(user_id, transactions)
        PaymentService.insertOrder(db, user_id, transactions)
            .then(order => {
                console.log(order)
            })
            .catch(error => {
                console.log(error)
            })
    })
    /* .route('/')
    .get(jsonBodyParser, (req, res, next) => {
        const { transactions } = req.body
        console.log('payment router', transactions)
        PaypalService.createPayment(transactions)
        .then(ress => {
            return res
        })  
});*/ 
  
  
// success page 
paymentRouter
    .route('/success')
    .get((req, res) => {
    console.log(req.query); 
    res.redirect('/'); 
})

// error page
paymentRouter
    .route('/err')
    .get((req , res) => {
        console.log(req.query); 
        res.redirect('/err.html'); 
})

module.exports = paymentRouter