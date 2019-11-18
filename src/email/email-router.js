const express = require("express")
const emailRouter = express.Router()
const jsonBodyParser = express.json()
const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require("../config")

emailRouter
    .post("/", jsonBodyParser, (req, res, next) => {
        const { data } = req.body
         
        const mailjet = require ("node-mailjet")
            .connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)
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
                                    "Email": `${data.userData[1]}`,
                                    "Name": `${data.userData[0]}`
                                }
                            ],
                            "Bcc": [
                                {
                                    "Email": "matt.friedberg@gmail.com",
                                    "Name": "Lakeshow Tickets Sale"  
                                }
                            ],
                            "TemplateID": 1070087,
                            "TemplateLanguage": true,
                            "Subject": "Lakeshow Tickets - Purchase Confirmation",
                            "Variables": {
                                "firstname": `${data.userData[0]}`,
                                "total_price": `$${data.order.orderTotal}.00`,
                                "order_id": data.order.id,
                                "products": data.ticketsArr,
                                "order_date": data.order.dateFormatted
                            }
                        }
                    ]
                })
            
            request
                .then((result) => {
                    console.log(result.body)
                    return res.send('{"message": "Email sent."}')
                })
                .catch((err) => {
                    console.log(err.statusCode, err.Errors)
                })    
    })



module.exports = emailRouter