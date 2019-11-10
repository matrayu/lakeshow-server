const express = require('express')
const PaymentService = require('./payment-service')
const { requireAuth } = require('../middleware/jwt-auth')
const paymentRouter = express.Router()
const jsonBodyParser = express.json()

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
                    .json(order)
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