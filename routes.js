var mainController = require('./controllers/controllerMain');
var paypalController = require('./controllers/paypalController');


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

    app.get('/', mainController.index);

    app.post('/paynow', paypalController.paynow);

    // 404 not found
    app.use(mainController.notFound404);
};