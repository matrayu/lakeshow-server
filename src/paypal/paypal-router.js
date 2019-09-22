const express = require('express')
const paypal = require('paypal-rest-sdk')
const { PAYPAL_CID, PAYPAL_SECRET } = require('../config')
const PaypalService = require('./paypal-service')

const paypalRouter = express.Router()
const jsonBodyParser = express.json()

// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': PAYPAL_CID, // please provide your client id here 
    'client_secret': PAYPAL_SECRET // provide your client secret here 
});
  
  

// start payment process
paypalRouter
    .route('/')
    .get(jsonBodyParser, (req, res, next) => {
        const { transactions } = req.body
        console.log('payment router', transactions)
        PaypalService.createPayment(transactions)
        .then(ress => {
            return res
        }) 
}); 
  
  
// success page 
paypalRouter
    .route('/success')
    .get((req, res) => {
    console.log(req.query); 
    res.redirect('/'); 
})

// error page
paypalRouter
    .route('/err')
    .get((req , res) => {
        console.log(req.query); 
        res.redirect('/err.html'); 
})

module.exports = paypalRouter