var paypal = require('paypal-rest-sdk');
var userController = require('./controllers/controllerMain');
// controllers
module.exports = function(app) {

    // Page will display after payment has beed transfered successfully
    app.get('/success', function(req, res) {
        res.send("Payment transfered successfully.");
    });

// Page will display when you canceled the transaction
    app.get('/cancel', function(req, res) {
        res.send("Payment canceled successfully.");
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname+'/index.ejs');
    });

    app.post('/paynow', function(req, res) {
        // paypal payment configuration.
        var payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": app.locals.baseurl+"/success",
                "cancel_url": app.locals.baseurl+"/cancel"
            },
            "transactions": [{
                "amount": {
                    "total":parseInt(req.body.amount),
                    "currency":  req.body.currency
                },
                "description": req.body.description
            }]
        };

        paypal.payment.create(payment, function (error, payment) {
            if (error) {
                console.log(error);
            } else {
                if(payment.payer.payment_method === 'paypal') {
                    req.paymentId = payment.id;
                    var redirectUrl;
                    console.log(payment);
                    for(var i=0; i < payment.links.length; i++) {
                        var link = payment.links[i];
                        if (link.method === 'REDIRECT') {
                            redirectUrl = link.href;
                        }
                    }
                    res.redirect(redirectUrl);
                }
            }
        });
    });
    // 404 not found
    app.use(userController.notFound404);
};