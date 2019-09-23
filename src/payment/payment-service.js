const PaymentService = {
    insertOrder(db, user_id, purchases) {
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
          .then(order => {
            console.log('UPDATING ORDER ID')
            purchases.forEach(purchase => {
              let orderItem = {
                product_id: purchase,
                order_id: order[0].id,
                order_item_status_code: 1,
                order_item_quantity: 1,
              }
              return db 
                .insert(orderItem)
                .into('order_items')
                .returning('*')
                .then(([orderItem]) => orderItem)
            })
            return order
          })
          .then(order => {
            console.log('UPDATING PRODUCT AVAILABLITY')
            purchases.forEach(purchase => {
              console.log(purchase)
              return db('products')
                .where({ id: purchase })
                .first()
                .update('available', 'false')
                .returning('available')
            })
            return 'All complete'
          })
    }
}

module.exports = PaymentService