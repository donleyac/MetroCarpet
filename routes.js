var userController = require('./controllers/controllerMain');
// controllers
module.exports = function(app) {

    // index
    app.get('/', userController.home);

    // 404 not found
    app.use(userController.notFound404);
};