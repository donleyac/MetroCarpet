var paypal = require('paypal-rest-sdk');
var paynow = function (req, res, next) {
    // paypal payment configuration.
    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "/success",
            "cancel_url": "/cancel"
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
};

module.exports.paynow=paynow;