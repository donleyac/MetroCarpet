// vendor libraries
var express = require('express');
var app = express();
var paypal = require('paypal-rest-sdk');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var ejs = require('ejs');
var path = require('path');

app.set('port', process.env.PORT || 3000); //launch application at this port
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating


app.use("/public",express.static(__dirname + "/public"));
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser()); //get information from html forms
app.use(session(
   {
      secret: 'secret strategic xxzzz code',
      resave: true,
      saveUninitialized: true
   }));
//paypal config
paypal.configure(require('./config/paypal.js').api);

// routes ======================================================================
require('./routes.js')(app);
// launch ======================================================================
var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});

