var Bookshelf = require('bookshelf');

var config = {
    host: 'localhost',  // your host
    user: 'postgres', // your database user
    password: 'postgres', // your database password
    database: 'eventmapper',
    charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
    client: 'pg',
    connection: config
});

module.exports.DB = DB;