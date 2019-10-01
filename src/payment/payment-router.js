const express = require('express')
/* const paypal = require('paypal-rest-sdk') */
/* const { PAYPAL_CID, PAYPAL_SECRET } = require('../config') */
const PaymentService = require('./payment-service')
const UserService = require('../users/users-service');
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
        PaymentService.insertOrder(db, user_id)
            .then(order => {
                transactions.forEach(product => {
                    let orderItem = {
                        product_id: product,
                        order_id: order.id,
                        order_item_status_code: 1,
                        order_item_quantity: 1,
                    }
                    PaymentService.insertOrderItems(db, orderItem)
                    PaymentService.updateProductAvailability(db, product)
                })
                return res
                        .status(201)
                        .send({ message: 'successfully ingested' })
            })
            .catch(next)
    })
  
  
// success page 
paymentRouter
    .route('/success')
    .get((req, res) => { 
    res.redirect('/'); 
})

// error page
paymentRouter
    .route('/err')
    .get((req , res) => {
        res.redirect('/err.html'); 
})

module.exports = paymentRouter