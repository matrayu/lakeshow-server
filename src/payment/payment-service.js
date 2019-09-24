const PaymentService = {
    insertOrder(db, user_id) {
      const newOrder = {
        user_id,
        order_status_code: 2,
        date_order_placed: 'now()',
        order_details: 'These are some additional details'
      }
      return db
        .insert(newOrder)
        .into('orders')
        .returning('*')
        .then(([order]) => order)
    },

    insertOrderItems(db, orderItem) {
      console.log('UPDATING ORDER Items')
      return db 
        .insert(orderItem)
        .into('order_items')
        .returning('*')
        .then(([orderItem]) => orderItem)
    },

    updateProductAvailability(db, productId) {
      console.log('Updating product avail', productId)
      return db('products')
        .where('id', '=', productId)
        .update({
          available: false
        })
        .returning('*')
        .then()
    }
}

module.exports = PaymentService