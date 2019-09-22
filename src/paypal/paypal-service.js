const paypal = require('paypal-rest-sdk')


const PaypalService = {
    createPayment(payment) {
        return new Promise((resolve, reject) => {
            paypal.payment.create(payment, function(error, payment){
                var links = {};
              
                if(error){
                  console.error(JSON.stringify(error));
                } else {
                  // Capture HATEOAS links
                  payment.links.forEach(function(linkObj){
                    links[linkObj.rel] = {
                      href: linkObj.href,
                      method: linkObj.method
                    };
                  })
              
                  // If the redirect URL is present, redirect the customer to that URL
                  if (links.hasOwnProperty('approval_url')) {
                    // Redirect the customer to links['approval_url'].href
                    console.log(links.approval_url)
                    resolve('Promise has resolved!')
                  } else {
                    console.error('no redirect URI present')
                  }
                }
              });
        });
    }
}

module.exports = PaypalService